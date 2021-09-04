import Head from "next/head";

import HomeHero from "../components/HomeHero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Joseph Collicoat</title>
        <meta name="description" content="Personal Portfolio 2021" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeHero />
      </main>
    </>
  );
}
