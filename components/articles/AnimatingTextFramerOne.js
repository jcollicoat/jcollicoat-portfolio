import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

export default function AnimatingTextFramerOne() {
  const text = "Cool animated text!";

  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <Title aria-label={text} role="heading">
      {text.split("").map((character, index) => (
        <Character
          ref={ref}
          aria-hidden="true"
          key={index}
          initial="hidden"
          animate={ctrls}
          variants={characterAnimation}
        >
          {character}
        </Character>
      ))}
    </Title>
  );
}
