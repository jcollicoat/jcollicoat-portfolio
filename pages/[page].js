import { useEffect, useContext } from "react";
import Head from "next/head";
import { ThemeContext } from "../contexts/ThemeStore";

import client from "../lib/sanity";

import Layout from "../components/Layout";
import ContentMapper from "../components/ContentMapper";

const slugsQuery = `*[!(_id in path('drafts.**')) && _type == "page" && name != "Homepage" && defined(slug.current)][].slug.current`;

const pageQuery = `{
  "page": *[_type == "page" && slug.current == $slug][0] {
    meta_title,
    meta_description,
    name,
    theme,
    custom_theme,
    content[] {
      _type == "articles" => {
        _type,
        articles_list[]-> {
          name,
          description,
          "image": file.asset->url,
          "image_dimensions": file.asset->metadata.dimensions,
          "slug": slug.current,
          tags[]-> {
            name
          },
        }
      },
      _type == "hero_home" => {
        _type,
        heading,
        intro,
        cta
      },
      _type == "hero_page" => {
        _type,
        title,
        intro
      },
      _type == "projects" => {
        _type,
        projects_list[]-> {
          name,
          description,
          "image": file.asset->url,
          "image_dimensions": file.asset->metadata.dimensions,
          "slug": slug.current,
          tags[]-> {
            name
          },
          is_interactive
        }
      },
    }
  }
}`;

export async function getStaticPaths() {
  const slugs = await client.fetch(slugsQuery);

  return {
    paths: slugs.map((slug) => ({
      params: {
        page: slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { page } = await client.fetch(pageQuery, {
    slug: params.page,
  });

  return {
    props: {
      pageData: page,
      pageContent: page.content,
    },
    revalidate: 1,
  };
}

export default function Page({ pageData, pageContent }) {
  let pageTheme = {
    background: "#111111",
    text: "#ffffff",
  };

  if (pageData.theme === "dark") {
    pageTheme = {
      background: "#111111",
      text: "#ffffff",
    };
  } else if (pageData.theme === "light") {
    pageTheme = {
      background: "#ffffff",
      text: "#111111",
    };
  } else if (pageData.theme === "custom") {
    pageTheme = {
      background: pageData.custom_theme.background.hex,
      text: pageData.custom_theme.text.hex,
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
    document.body.style.backgroundColor = `${pageTheme.background} || #111111`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{pageData.meta_title} – Joseph Collicoat</title>
        <meta name="description" content={pageData.meta_description} />
        <meta property="og:title" content={pageData.meta_title} key="ogtitle" />
        <meta
          property="og:description"
          content={pageData.meta_description}
          key="ogdesc"
        />
        <meta
          property="og:site_name"
          content="Joseph Collicoat"
          key="ogsitename"
        />
        <meta property="og:image" content={pageData.meta_image} key="ogimage" />
        <meta
          property="og:url"
          content="https://dev.josephcollicoat.com"
          key="ogtitle"
        />
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:creator" content="@jcollicoat" key="twhandle" />
        <link rel="icon" href="/favicon.ico" key="" />
      </Head>
      <Layout>
        <ContentMapper sections={pageContent} />
      </Layout>
    </>
  );
}
