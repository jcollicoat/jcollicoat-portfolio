import { ThemeProvider } from "styled-components";
import { ParallaxProvider } from "react-scroll-parallax";

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
  return (
    <>
      <ParallaxProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {/*<MouseCursor />*/}
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </ParallaxProvider>
    </>
  );
}

export default MyApp;
