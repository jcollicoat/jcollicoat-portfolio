import styled from "styled-components";

import useMousePosition from "../../hooks/useMousePosition";

const Cursor = styled.div.attrs(({ mouseX, mouseY }) => ({
  style: {
    left: `calc(${mouseX}px - 1rem)`,
    top: `calc(${mouseY}px - 1rem)`,
  },
}))`
  display: none;

  // Only display for mouse-controlled devices
  @media (hover: hover) and (pointer: fine) {
    background-color: #ffffff;
    border-radius: 50%;
    display: block;
    height: 2rem;
    mix-blend-mode: difference;
    pointer-events: none;
    position: fixed;
    width: 2rem;
    z-index: 200;
  }
`;

export default function MouseCursor() {
  const { x, y } = useMousePosition();

  const hasMovedCursor = typeof x === "number" && typeof y === "number";

  return (
    <Cursor mouseX={hasMovedCursor ? x : 0} mouseY={hasMovedCursor ? y : 0} />
  );
}
