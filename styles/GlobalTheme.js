import { useContext } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ThemeContext } from "../contexts/ThemeStore";

const GlobalStyle = createGlobalStyle`
  :root {
    --padding-sm: 0.5rem;
    --padding-md: 1rem;
    --padding-lg: 1.5rem;

    @media (min-width: 400px) {
      --padding-sm: 1rem;
      --padding-md: 2rem;
      --padding-lg: 3rem;
    }

    @media (min-width: 1200px) {
      --padding-sm: 2rem;
      --padding-md: 3rem;
      --padding-lg: 4rem;
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  * {
    box-sizing: border-box;

    /* Disable cursor on mouse-controlled devices
    @media (hover: hover) and (pointer: fine) {
      cursor: none !important;
    }
    */
  }

  html,
  body {
    color: #ffffff;
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    padding: 0;
  }

  body {
    /* Disable background animation
    animation: gradient 20s ease infinite alternate;
    background-color: #000000;
    background-image: linear-gradient(
      60deg,
      rgba(254, 0, 114, 0.1),
      rgba(187, 11, 222, 0.1),
      rgba(90, 0, 245, 0.1),
      rgba(11, 31, 222, 0.1),
      rgba(0, 139, 255, 0.1)
    );
    background-size: 300% 300%;
    */
    background-color: ${(props) => props.theme.background};
    min-height: 100vh;
    transition: background-color 0.5s ${(props) => props.theme.easeout};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    line-height: 1;
    margin: 0;
  }
`;

const GlobalTheme = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default GlobalTheme;
