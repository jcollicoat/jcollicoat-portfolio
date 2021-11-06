import styled from "styled-components";
import { motion } from "framer-motion";

const Main = styled(motion.main)`
  background-color: ${(props) => props.theme.background || `#111111`};
  color: ${(props) => props.theme.text || "#ffffff"};
  min-height: 100vh;
  padding: 15rem 0 10rem 0;
  transition: background-color 0.25s ${(props) => props.theme.easeout};
  width: 100%;
`;

const variants = {
  hidden: {
    opacity: 0,
    //x: -32,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
  exit: {
    opacity: 0,
    //x: 32,
    transition: {
      duration: 0.25,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

export default function Layout({ children }) {
  return (
    <Main variants={variants} initial="hidden" animate="enter" exit="exit">
      {children}
    </Main>
  );
}
