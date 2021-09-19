import Head from "next/head";
import { useRouter } from "next/router";

import client from "../../lib/sanity";

const slugsQuery = `*[_type == "project" && defined(slug.current)][].slug.current`;

const projectQuery = `{
  "project": *[_type == "project" && slug.current == $slug][0] {
    meta_title,
    meta_description,
    name,
    tags[]-> {
      name
    },
    is_interactive
  }
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(slugsQuery);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { project } = await client.fetch(projectQuery, {
    slug: params.slug,
  });

  return {
    props: {
      projectData: project,
    },
    revalidate: 1,
  };
}

export default function ProjectPage({ projectData }) {
  console.log(projectData);

  return (
    <>
      <Head>
        <title>{projectData.meta_title} – Joseph Collicoat</title>
        <meta name="description" content={projectData.meta_description} />
      </Head>
      <main>
        <h1>{projectData.name}</h1>
        {projectData.tags.map((tag, index) => {
          return <div key={index}>{tag.name}</div>;
        })}
      </main>
    </>
  );
}
