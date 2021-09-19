import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-03-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  ignoreBrowserTokenWarning: true,
});

export default client;
