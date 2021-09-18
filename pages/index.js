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

export default function Home({ pageData, pageContent }) {
  console.log(pageContent);

  return (
    <>
      <Head>
        <title>{pageData.meta_title}</title>
        <meta name="description" content={pageData.meta_description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContent sections={pageContent} />
      </main>
    </>
  );
}
