import styled from "styled-components";

import useMousePosition from "../../hooks/useMousePosition";

const Cursor = styled.div.attrs(({ mouseX, mouseY }) => ({
  style: {
    left: `calc(${mouseX}px - 18px)`,
    top: `calc(${mouseY}px - 18px)`,
  },
}))`
  display: none;

  // Only display for mouse-controlled devices
  @media (hover: hover) and (pointer: fine) {
    background-color: #ffffff;
    border-radius: 50%;
    display: block;
    height: 36px;
    mix-blend-mode: difference;
    pointer-events: none;
    position: absolute;
    width: 36px;
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
