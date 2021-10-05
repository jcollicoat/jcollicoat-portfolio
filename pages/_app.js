import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import { useRouter } from "next/dist/client/router";

import MouseCursor from "../components/global/MouseCursor";
import Header from "../components/Header";

import GlobalStyle from "../styles/globals";
import "../styles/globals.css";

const theme = {
  easeout: "cubic-bezier(0.2, 0.65, 0.3, 0.9)",
  padding: {
    sm: "var(--padding-sm)",
    md: "var(--padding-md)",
    lg: "var(--padding-lg)",
  },
};

function MyApp({ Component, pageProps }) {
  // Get page path to use as key in components
  // so page transitions work between dynamic pages
  // of the same type
  const { asPath } = useRouter();
  console.log(asPath);

  return (
    <>
      <ParallaxProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {/*<MouseCursor />*/}
          <Header />
          <AnimatePresence
            exitBeforeEnter
            //initial={false}
            onExitComplete={() =>
              typeof window !== "undefined" && window.scrollTo(0, 0)
            }
          >
            <Component {...pageProps} key={asPath} />
          </AnimatePresence>
        </ThemeProvider>
      </ParallaxProvider>
    </>
  );
}

export default MyApp;
