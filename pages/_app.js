import MouseCursor from "../components/global/MouseCursor";
import Header from "../components/Header";

import GlobalStyle from "../styles/globals";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <MouseCursor />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
