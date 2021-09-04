import { useState, useEffect } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  });

  return mousePosition;
}
