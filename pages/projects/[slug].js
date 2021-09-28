import Head from "next/head";

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
// Issue is with $slug generating undefined pages

export async function getStaticPaths() {
  const slugs = await client.fetch(slugsQuery);

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
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
