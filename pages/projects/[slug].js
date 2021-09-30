import { useState } from "react";
import Head from "next/head";

import client from "../../lib/sanity";

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
  return (
    <>
      <Head>
        <title>{projectData.meta_title} – Joseph Collicoat</title>
        <meta name="description" content={projectData.meta_description} />
      </Head>
      <main>
        <HeroProject data={projectData} />
      </main>
    </>
  );
}
