import Head from "next/head";

import client from "../lib/sanity";

import Layout from "../components/Layout";

const slugsQuery = `*[_type == "page" && name != "Homepage" && defined(slug.current)][].slug.current`;

const pageQuery = `{
  "page": *[_type == "page" && slug.current == $slug][0] {
    meta_title,
    meta_description,
    name,
    theme,
    custom_theme
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
    },
    revalidate: 1,
  };
}

export default function Page({ pageData }) {
  let theme = {
    background: "#111111",
    text: "#ffffff",
  };

  if (pageData.theme === "dark") {
    theme = {
      background: "#111111",
      text: "#ffffff",
    };
  } else if (pageData.theme === "light") {
    theme = {
      background: "#ffffff",
      text: "#111111",
    };
  } else if (pageData.theme === "custom") {
    theme = {
      background: pageData.custom_theme.background.hex,
      text: pageData.custom_theme.text.hex,
    };
  }

  return (
    <>
      <Head>
        <title>{pageData.meta_title} – Joseph Collicoat</title>
        <meta name="description" content={pageData.meta_description} />
      </Head>
      <Layout theme={theme}>
        <div>
          <div>{pageData.name}</div>
        </div>
      </Layout>
    </>
  );
}
