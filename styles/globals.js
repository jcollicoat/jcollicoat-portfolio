import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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

    // Disable cursor on mouse-controlled devices
    @media (hover: hover) and (pointer: fine) {
      cursor: none;
    }
  }

  html,
  body {
    animation: gradient 20s ease infinite;
    background-color: #000000;
    background-image: linear-gradient(
      60deg,
      rgba(254, 0, 114, 0.05),
      rgba(187, 11, 222, 0.05),
      rgba(90, 0, 245, 0.05),
      rgba(11, 31, 222, 0.05),
      rgba(0, 139, 255, 0.05)
    ),
    linear-gradient(
      -60deg,
      rgba(0, 139, 255, 0.05),
      rgba(11, 31, 222, 0.05),
      rgba(90, 0, 245, 0.05),
      rgba(187, 11, 222, 0.05),
      rgba(254, 0, 114, 0.05)
    );
    background-size: 300% 300%;
    color: #ffffff;
    cursor: none;
    margin: 0;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
