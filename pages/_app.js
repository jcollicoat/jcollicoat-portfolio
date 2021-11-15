import { AnimatePresence } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import { useRouter } from "next/dist/client/router";

//import MouseCursor from "../components/MouseCursor";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/GlobalCSS.css";
import { ThemeStore } from "../contexts/ThemeStore";
import GlobalTheme from "../styles/GlobalTheme";

function MyApp({ Component, pageProps }) {
  // Get page path to use as key in components
  // so page transitions work between dynamic pages
  // of the same type
  const { asPath } = useRouter();

  return (
    <>
      <ParallaxProvider>
        <ThemeStore>
          <GlobalTheme>
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
            <Footer />
          </GlobalTheme>
        </ThemeStore>
      </ParallaxProvider>
    </>
  );
}

export default MyApp;
