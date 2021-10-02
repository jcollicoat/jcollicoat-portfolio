import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Main = styled(motion.main)`
  background-color: ${(props) => props.theme.background || `#111111`};
  color: ${(props) => props.theme.text || "#ffffff"};
  min-height: 100vh;
  padding: 15rem 0;
  width: 100%;
`;

const variants = {
  hidden: { opacity: 0, x: -32 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 32 },
};

export default function Layout({ children, theme }) {
  // Update background-color on body to reduce jank
  useEffect(() => {
    const updateBackground = setTimeout(() => {
      document.body.style.backgroundColor = `${theme.background}` || "#111111";
    }, 250);

    return () => clearTimeout(updateBackground);
  }, [theme.background]);

  return (
    <Main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{
        duration: 0.25,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
      theme={theme}
    >
      {children}
    </Main>
  );
}
