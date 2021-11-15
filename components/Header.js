import { useState } from "react";
import styled from "styled-components";

import SiteGrid from "./SiteGrid";

import HeaderLogo from "./HeaderLogo";
import HeaderButton from "./HeaderButton";
import HeaderNav from "./HeaderNav";

const Wrapper = styled.header`
  color: #ffffff;
  //mix-blend-mode: ${(props) => (props.navOpen ? `normal` : `difference`)};
  padding: ${(props) => props.theme.padding.md} 0;
  //pointer-events: none;
  position: fixed;
  top: 0;
  transition: color 0.25s ${(props) => props.theme.easeout};
  width: 100%;
  z-index: 100;

  @media (min-width: 800px) {
    color: ${(props) => props.theme.text};
  }
`;

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const handleClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Wrapper navOpen={navOpen}>
      <SiteGrid>
        <HeaderLogo navOpen={navOpen} />
        <HeaderButton handleClick={handleClick} navOpen={navOpen} />
        <HeaderNav handleClick={handleClick} navOpen={navOpen} />
      </SiteGrid>
    </Wrapper>
  );
}
