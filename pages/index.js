import Head from "next/head";

import client from "../lib/sanity";

import PageContent from "../components/PageContent";

const homepageQuery = `*[_type == "page" && name == "Homepage"][0] {
  meta_title,
  meta_description,
  name,
  uses_light_theme,
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
        <meta
          property="og:image"
          content="https://dev.josephcollicoat.com/meta_image.png"
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
      <main>
        <PageContent sections={pageContent} />
      </main>
    </>
  );
}
