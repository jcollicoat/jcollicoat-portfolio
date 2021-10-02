import Head from "next/head";

import client from "../lib/sanity";

import Layout from "../components/Layout";
import PageContent from "../components/PageContent";

const homepageQuery = `*[_type == "page" && name == "Homepage"][0] {
  meta_title,
  meta_description,
  "meta_image": meta_image.asset->url,
  name,
  theme,
  custom_theme,
  content[] {
    _type == "hero_home" => {
      _type,
      heading,
      intro,
      cta
    },
    _type == "projects" => {
      _type,
      projects_list[]-> {
        name,
        description,
        "image": file.asset->url,
        "slug": slug.current,
        tags[]-> {
          name
        },
        is_interactive
      }
    },
  }
}`;

export async function getStaticProps() {
  const homepageData = await client.fetch(homepageQuery);

  return {
    props: {
      pageData: homepageData,
      pageContent: homepageData.content,
    },
    revalidate: 1,
  };
}

export default function HomePage({ pageData, pageContent }) {
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
        <title>{pageData.meta_title}</title>
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
      <Layout theme={theme}>
        <PageContent sections={pageContent} />
      </Layout>
    </>
  );
}
