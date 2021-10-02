import Link from "next/link";
import styled from "styled-components";

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
  transition: opacity 0.5s ${(props) => props.theme.easeout};
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

const Item = styled.a`
  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: appear 0.25s ${(props) => props.theme.easeout} both;
  animation-delay: ${(props) => props.delay};
  margin: ${(props) => props.theme.padding.lg} 0;
  position: relative;

  @media (min-width: 800px) {
    margin: 0 0 0 ${(props) => props.theme.padding.lg};

    ::after {
      background-color: #ffffff;
      content: "";
      display: block;
      height: 2px;
      left: 0;
      position: absolute;
      right: 0;
      transform: scaleX(0);
      transform-origin: top right;
      transition: transform 0.25s ease-out;
    }

    &:hover {
      ::after {
        transform: scaleX(1);
        transform-origin: top left;
      }
    }
  }
`;

export default function HeaderNav({ handleClick, navOpen }) {
  return (
    <Nav navOpen={navOpen}>
      <Link href="/" passHref scroll={false}>
        <Item delay="0.5s" onClick={navOpen && handleClick}>
          Projects
        </Item>
      </Link>
      <Link href="/articles" passHref scroll={false}>
        <Item delay="0.6s" onClick={navOpen && handleClick}>
          Articles
        </Item>
      </Link>
      <Link href="/contact" passHref scroll={false}>
        <Item delay="0.7s" onClick={navOpen && handleClick}>
          Contact
        </Item>
      </Link>
    </Nav>
  );
}
