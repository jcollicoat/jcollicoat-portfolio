import styled from "styled-components";

const Button = styled.svg`
  align-self: center;
  color: ${(props) => {
    if (props.nav_open) {
      return `#ffffff`;
    }
    return props.theme.text;
  }};
  cursor: pointer;
  grid-column: -1 / -1;
  height: 2rem;
  pointer-events: auto;
  width: 2rem;
  z-index: 101;

  @media (min-width: 800px) {
    display: none;
  }
`;

const Line = styled.line`
  opacity: ${(props) => props.opacity};
  transition: opacity 0.25s ${(props) => props.theme.easeout};
`;

export default function HeaderButton({ handleClick, navOpen }) {
  return (
    <Button
      fill="none"
      height="100%"
      nav_open={navOpen}
      onClick={handleClick}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
    >
      <Line opacity={navOpen ? "1" : "0"} x1="18" y1="6" x2="6" y2="18"></Line>
      <Line opacity={navOpen ? "1" : "0"} x1="6" y1="6" x2="18" y2="18"></Line>

      <Line opacity={navOpen ? "0" : "1"} x1="3" y1="12" x2="21" y2="12"></Line>
      <Line opacity={navOpen ? "0" : "1"} x1="3" y1="6" x2="21" y2="6"></Line>
      <Line opacity={navOpen ? "0" : "1"} x1="3" y1="18" x2="21" y2="18"></Line>
    </Button>
  );
}
