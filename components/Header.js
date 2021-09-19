import { useState } from "react";
import styled from "styled-components";

import SiteGrid from "./global/SiteGrid";

import HeaderLogo from "./HeaderLogo";
import HeaderButton from "./HeaderButton";
import HeaderNav from "./HeaderNav";

const Wrapper = styled.header`
  mix-blend-mode: ${(props) => (props.navOpen ? `normal` : `difference`)};
  padding: ${(props) => props.theme.padding.md} 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const handleClick = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Wrapper navOpen={navOpen}>
      <SiteGrid>
        <HeaderLogo />
        <HeaderButton handleClick={handleClick} navOpen={navOpen} />
        <HeaderNav navOpen={navOpen} />
      </SiteGrid>
    </Wrapper>
  );
}
