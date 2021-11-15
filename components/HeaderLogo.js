import Link from "next/link";
import styled from "styled-components";

const Logo = styled.svg`
  cursor: pointer;
  fill: ${(props) => {
    if (props.nav_open) {
      return `#ffffff`;
    }
    return props.theme.text;
  }};
  grid-column: 1 / 2;
  height: 3rem;
  pointer-events: auto;
  transition: fill 0.25s ${(props) => props.theme.easeout};
  width: 3rem;
  z-index: 101;

  @media (min-width: 800px) {
    grid-column: 2 / 3;
  }
`;

export default function HeaderLogo({ navOpen }) {
  return (
    <Link href="/" passHref scroll={false}>
      <Logo
        height="100%"
        nav_open={navOpen}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
      >
        <path d="M97.87,0H48.93V9.48H90.4V31.07A21.31,21.31,0,0,1,84,46.33a22.07,22.07,0,0,1-30.93,0l-1.62-1.39A31.83,31.83,0,0,0,9.21,47a30.81,30.81,0,0,0,0,43.94,31.81,31.81,0,0,0,44.52,0l1.51-1.49-1.51-1.49L50,84.21l-1.51-1.49-1.51,1.49a22.11,22.11,0,0,1-30.94,0,21.42,21.42,0,0,1,0-30.53,22.11,22.11,0,0,1,30.94,0l1.61,1.39a31.75,31.75,0,0,0,42.23-2,30.66,30.66,0,0,0,9.22-22V0Z" />
      </Logo>
    </Link>
  );
}
