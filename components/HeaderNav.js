import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

import useAnimateIn from "../hooks/useAnimateIn";

const Nav = styled.nav`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 500;
  height: 100vh;
  left: 0;
  line-height: 1;
  opacity: ${(props) => (props.navOpen ? `1` : `0`)};
  padding-top: 8rem;
  position: absolute;
  pointer-events: ${(props) => (props.navOpen ? `auto` : `none`)};
  text-align: center;
  text-transform: uppercase;
  top: 0;
  transition: opacity 0.25s ease-out;
  width: 100%;

  @media (min-width: 800px) {
    align-self: center;
    background: none;
    flex-direction: row;
    font-size: 1rem;
    grid-column: 3 / -2;
    height: auto;
    justify-content: flex-end;
    opacity: 1;
    padding-top: 0;
    pointer-events: auto;
    position: static;
    text-align: right;
    width: auto;
  }
`;

const Item = styled(motion.a)`
  margin: ${(props) => props.theme.padding.lg} 0;

  @media (min-width: 800px) {
    margin: 0 0 0 ${(props) => props.theme.padding.lg};

    ::after {
      background-color: #ffffff;
      content: "";
      display: block;
      height: 2px;
      transition: width 0.25s ease-out;
      width: 0;
    }

    &:hover {
      ::after {
        width: 100%;
      }
    }
  }
`;

export default function HeaderNav({ navOpen }) {
  const {
    ref: workRef,
    ctrls: workCtrls,
    vars: workVars,
  } = useAnimateIn({
    delay: 0.1,
    distance: `1rem`,
    duration: 0.5,
  });

  const {
    ref: blogRef,
    ctrls: blogCtrls,
    vars: blogVars,
  } = useAnimateIn({
    delay: 0.2,
    distance: `1rem`,
    duration: 0.5,
  });

  const {
    ref: contactRef,
    ctrls: contactCtrls,
    vars: contactVars,
  } = useAnimateIn({
    delay: 0.2,
    distance: `1rem`,
    duration: 0.5,
  });

  return (
    <Nav navOpen={navOpen}>
      <Link href="/" passHref>
        <Item
          ref={workRef}
          initial="hidden"
          animate={workCtrls}
          variants={workVars}
        >
          Work
        </Item>
      </Link>
      <Link href="/blog" passHref>
        <Item
          ref={blogRef}
          initial="hidden"
          animate={blogCtrls}
          variants={blogVars}
        >
          Blog
        </Item>
      </Link>
      <Link href="/contact" passHref>
        <Item
          ref={contactRef}
          initial="hidden"
          animate={contactCtrls}
          variants={contactVars}
        >
          Contact
        </Item>
      </Link>
    </Nav>
  );
}
