import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { useInView } from "react-intersection-observer";

import useMediaQuery from "../hooks/useMediaQuery";

const TitleParallax = styled(Parallax)`
  grid-column: 1 / -1;

  @media (min-width: 800px) {
    grid-column: 4 / 21;
  }
`;

const Title = styled.h1`
  font-family: "Ultrasolar Web";
  font-size: 4rem;
  font-weight: 400;
  line-height: 0.9;
  margin-bottom: 2rem;

  @media (min-width: 800px) {
    font-size: 6rem;
  }

  @media (min-width: 1200px) {
    font-size: 8rem;
  }

  @media (min-width: 1600px) {
    font-size: 10rem;
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
`;

export default function HeroProjectTitle({ title }) {
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

  // Media query for parallax
  const isSmall = useMediaQuery("(max-width: 1200px)");

  // Parallax
  const yOffset = isSmall ? [`40px`, `-40px`] : [`80px`, `-80px`];

  return (
    <TitleParallax y={yOffset}>
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
    </TitleParallax>
  );
}
