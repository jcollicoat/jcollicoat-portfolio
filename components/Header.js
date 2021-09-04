import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import SiteGrid from "./global/SiteGrid";

import HeaderLogo from "./HeaderLogo";
import HeaderButton from "./HeaderButton";

const Wrapper = styled.header`
  mix-blend-mode: difference;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  z-index: 100;

  @media (min-width: 800px) {
    padding: 1.5rem 0;
  }

  @media (min-width: 1200px) {
    padding: 2rem 0;
  }

  @media (min-width: 1600px) {
    padding: 3rem 0;
  }
`;

const Nav = styled.nav`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 500;
  height: 100vh;
  justify-content: center;
  left: 0;
  line-height: 1;
  opacity: ${(props) => (props.navOpen ? `1` : `0`)};
  position: absolute;
  pointer-events: ${(props) => (props.navOpen ? `auto` : `none`)};
  text-align: center;
  text-transform: uppercase;
  top: 0;
  transition: opacity 0.5s ease;
  width: 100%;

  @media (min-width: 800px) {
    align-self: center;
    flex-direction: row;
    font-size: 1rem;
    grid-column: 2 / -1;
    height: auto;
    justify-content: flex-end;
    opacity: 1;
    pointer-events: auto;
    position: static;
    text-align: right;
    width: auto;
  }
`;

const Item = styled.a`
  margin: 2rem 0;

  @media (min-width: 800px) {
    margin: 0 0 0 3rem;
  }

  @media (min-width: 1200px) {
    margin: 0 0 0 5rem;
  }

  @media (min-width: 1600px) {
    margin: 0 0 0 7rem;
  }
`;

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const handleClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Wrapper>
      <SiteGrid>
        <HeaderLogo />
        <HeaderButton handleClick={handleClick} navOpen={navOpen} />
        <Nav navOpen={navOpen}>
          <Link href="/" passHref>
            <Item>Work</Item>
          </Link>
          <Item>Blog</Item>
          <Item>Contact</Item>
        </Nav>
      </SiteGrid>
    </Wrapper>
  );
}
