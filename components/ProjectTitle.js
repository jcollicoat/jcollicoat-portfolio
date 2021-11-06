import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Title = styled.h2`
  font-family: "Ultrasolar Web";
  font-size: 3rem;
  font-weight: 400;
  line-height: 0.9;
  margin-bottom: 1rem;

  @media (min-width: 800px) {
    font-size: 4rem;
  }

  @media (min-width: 1200px) {
    font-size: 5rem;
  }

  @media (min-width: 1600px) {
    font-size: 6rem;
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

export default function ProjectTitle({ title }) {
  // Trigger when in view
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

  // Animation
  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `1rem`,
    },
    visible: {
      opacity: 1,
      y: `0rem`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <Title aria-label={title} role="heading">
      {title.split(" ").map((word, index) => {
        return (
          <Word
            ref={ref}
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}
          >
            {word.split("").map((character, index) => {
              return (
                <Character
                  aria-hidden="true"
                  key={index}
                  variants={characterAnimation}
                >
                  {character}
                </Character>
              );
            })}
          </Word>
        );
      })}
    </Title>
  );
}
