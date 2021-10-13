import { useEffect, useContext } from "react";
import Head from "next/head";
import { ThemeContext } from "../../contexts/ThemeStore";

import client from "../../lib/sanity";

import Layout from "../../components/Layout";
import HeroProject from "../../components/HeroProject";

const slugsQuery = `*[_type == "project" && defined(slug.current)][].slug.current`;

const projectQuery = `{
  "project": *[_type == "project" && slug.current == $slug][0] {
    meta_title,
    meta_description,
    name,
    intro,
    tags[]-> {
      name
    },
    is_interactive,
    theme,
    custom_theme
  }
}`;

export async function getStaticPaths() {
  const slugs = await client.fetch(slugsQuery);

  return {
    paths: slugs.map((slug) => ({
      params: {
        project: slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { project } = await client.fetch(projectQuery, {
    slug: params.project,
  });

  return {
    props: {
      projectData: project,
    },
    revalidate: 1,
  };
}

export default function ProjectPage({ projectData }) {
  let pageTheme = {
    background: "#111111",
    text: "#ffffff",
  };

  if (projectData.theme === "dark") {
    pageTheme = {
      background: "#111111",
      text: "#ffffff",
    };
  } else if (projectData.theme === "light") {
    pageTheme = {
      background: "#ffffff",
      text: "#111111",
    };
  } else if (projectData.theme === "custom") {
    pageTheme = {
      background: projectData.custom_theme.background.hex,
      text: projectData.custom_theme.text.hex,
    };
  }

  const { theme, switchTheme } = useContext(ThemeContext);

  useEffect(() => {
    switchTheme({
      ...theme,
      background: pageTheme.background,
      text: pageTheme.text,
    });

    // Update background-color on body to reduce jank
    //document.body.style.backgroundColor = `${pageTheme.background} || #111111`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{projectData.meta_title} – Joseph Collicoat</title>
        <meta name="description" content={projectData.meta_description} />
      </Head>
      <Layout>
        <HeroProject data={projectData} />
      </Layout>
    </>
  );
}
