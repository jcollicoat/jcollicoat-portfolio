import React, { useEffect, useContext } from "react";
import Head from "next/head";
import { ThemeContext } from "../../contexts/ThemeStore";

import client from "../../lib/sanity";

import Layout from "../../components/Layout";
import HeroArticle from "../../components/HeroArticle";
import ArticleBlocks from "../../components/sections/ArticleBlocks";

const slugsQuery = `*[!(_id in path('drafts.**')) && _type == "article" && defined(slug.current)][].slug.current`;

const articleQuery = `{
  "article": *[_type == "article" && slug.current == $slug][0] {
    meta_title,
    meta_description,
    "meta_image": meta_image->url,
    name,
    intro,
    "image": file.asset->url,
    "image_dimensions": file.asset->metadata.dimensions,
    tags[]-> {
      name
    },
    content[] {
      ...,
      markDefs[] {
        ...,
        _type == "link_internal" => {
          "slug": @.reference->slug.current,
          "type": @.reference->_type,
        },
        _type == "link_file" => {
          "url": @.reference->file.asset->url
        },
      }
    }
  }
}`;

export async function getStaticPaths() {
  const slugs = await client.fetch(slugsQuery);

  return {
    paths: slugs.map((slug) => ({
      params: {
        article: slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { article } = await client.fetch(articleQuery, {
    slug: params.article,
  });

  return {
    props: {
      articleData: article,
      articleContent: article.content,
    },
    revalidate: 1,
  };
}

export default function ArticlePage({ articleData, articleContent }) {
  let pageTheme = {
    background: "#ffffff",
    text: "#111111",
  };

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
        <title>{articleData.meta_title} – Joseph Collicoat</title>
        <meta name="description" content={articleData.meta_description} />
        <meta
          property="og:title"
          content={articleData.meta_title}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={articleData.meta_description}
          key="ogdesc"
        />
        <meta
          property="og:site_name"
          content="Joseph Collicoat"
          key="ogsitename"
        />
        <meta
          property="og:image"
          content={articleData.meta_image}
          key="ogimage"
        />
        <meta
          property="og:url"
          content="https://dev.josephcollicoat.com"
          key="ogtitle"
        />
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:creator" content="@jcollicoat" key="twhandle" />
        <link rel="icon" href="/Favicon.png" key="" />
      </Head>
      <Layout>
        <HeroArticle data={articleData} />
        <ArticleBlocks content={articleContent} />
      </Layout>
    </>
  );
}
