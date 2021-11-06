import { useEffect, useContext } from "react";
import Head from "next/head";
import { ThemeContext } from "../../contexts/ThemeStore";

import client from "../../lib/sanity";

import Layout from "../../components/Layout";
import HeroProject from "../../components/HeroProject";
import ContentMapper from "../../components/ContentMapper";

const slugsQuery = `*[!(_id in path('drafts.**')) && _type == "project" && defined(slug.current)][].slug.current`;

const projectQuery = `{
  "project": *[_type == "project" && slug.current == $slug][0] {
    meta_title,
    meta_description,
    "meta_image": meta_image->url,
    name,
    intro,
    tags[]-> {
      name
    },
    is_interactive,
    theme,
    custom_theme,
    content[] {
      _type == "project_image" => {
        _type,
        "image": image.asset->url,
        "image_dimensions": image.asset->metadata.dimensions,
        "image_is_decorative": image.is_decorative,
        "image_alt": image.alt,
        image_size,
        include_caption,
        caption,
        include_copy,
        copy_position,
        copy_heading,
        copy,
        include_cta,
        cta_text,
        link_external,
        "link_file": link_file->file.asset->url,
        "link_internal_type": link_internal->_type,
        "link_internal": link_internal->slug.current,
      },
      _type == "project_image_grid" => {
        _type,
        copy_heading,
        copy,
        columns,
        image_size,
        items[] {
          "image": image.asset->url,
          "image_dimensions": image.asset->metadata.dimensions,
          "image_is_decorative": image.is_decorative,
          "image_alt": image.alt,
          include_name,
          name,
          include_copy,
          copy,
        }
      },
      _type == "project_image_text" => {
        _type,
        "image": image.asset->url,
        "image_dimensions": image.asset->metadata.dimensions,
        "image_is_decorative": image.is_decorative,
        "image_alt": image.alt,
        include_caption,
        caption_position,
        caption,
        copy_position,
        copy_heading,
        copy,
        include_cta,
        cta_text,
        link_external,
        "link_file": link_file->file.asset->url,
        "link_internal_type": link_internal->_type,
        "link_internal": link_internal->slug.current,
      },
      _type == "project_process_work" => {
        _type,
        items[] {
          "image": image.asset->url,
          "image_dimensions": image.asset->metadata.dimensions,
          "image_is_decorative": image.is_decorative,
          "image_alt": image.alt,
          heading,
          copy,
          include_cta,
          cta_text,
          link_external,
          "link_file": link_file->file.asset->url,
          "link_internal_type": link_internal->_type,
          "link_internal": link_internal->slug.current,
        }
      },
      _type == "project_text" => {
        _type,
        heading,
        copy,
        include_cta,
        cta_text,
        link_external,
        "link_file": link_file->file.asset->url,
        "link_internal_type": link_internal->_type,
        "link_internal": link_internal->slug.current,
      },
      _type == "project_video" => {
        _type,
        video,
        video_size,
        include_caption,
        caption,
        include_copy,
        copy_position,
        copy_heading,
        copy,
        include_cta,
        cta_text,
        link_external,
        "link_file": link_file->file.asset->url,
        "link_internal_type": link_internal->_type,
        "link_internal": link_internal->slug.current,
      }
    },
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
      projectContent: project.content,
    },
    revalidate: 1,
  };
}

export default function ProjectPage({ projectData, projectContent }) {
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
    document.body.style.backgroundColor = `${pageTheme.background} || #111111`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{projectData.meta_title} – Joseph Collicoat</title>
        <meta name="description" content={projectData.meta_description} />
        <meta
          property="og:title"
          content={projectData.meta_title}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={projectData.meta_description}
          key="ogdesc"
        />
        <meta
          property="og:site_name"
          content="Joseph Collicoat"
          key="ogsitename"
        />
        <meta
          property="og:image"
          content={projectData.meta_image}
          key="ogimage"
        />
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
        <HeroProject data={projectData} />
        <ContentMapper sections={projectContent} />
      </Layout>
    </>
  );
}
