import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ParallaxProvider } from "react-scroll-parallax";
import { useRouter } from "next/dist/client/router";
import Script from "next/script";
import * as gtag from "../lib/gtag";

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

  // GA route change pageview tracking
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        id="load-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="load-ga"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || []
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date())
            gtag('config', gtag.GA_TRACKING_ID, {
              page_path: window.location.pathname
            })
          `,
        }}
      />
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
