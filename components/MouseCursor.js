import styled from "styled-components";

import useMousePosition from "../hooks/useMousePosition";

const Cursor = styled.div.attrs(({ mouseX, mouseY }) => ({
  style: {
    transform: `translate(calc(${mouseX}px - 0.5rem), calc(${mouseY}px - 0.5rem))`,
  },
}))`
  display: none;

  // Only display for mouse-controlled devices
  @media (hover: hover) and (pointer: fine) {
    background-color: #ffffff;
    border-radius: 50%;
    display: block;
    height: 1rem;
    mix-blend-mode: difference;
    pointer-events: none;
    position: fixed;
    width: 1rem;
    will-change: transform;
    z-index: 200;
  }
`;

export default function MouseCursor() {
  const { x, y } = useMousePosition();
  console.log(x, y);

  const hasMovedCursor = typeof x === "number" && typeof y === "number";

  return (
    <Cursor mouseX={hasMovedCursor ? x : 0} mouseY={hasMovedCursor ? y : 0} />
  );
}
