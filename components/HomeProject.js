import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

import useAnimateIn from "../hooks/useAnimateIn";
import useMediaQuery from "../hooks/useMediaQuery";

import SiteGrid from "./global/SiteGrid";

const Section = styled.section`
  margin: 10rem 0;
`;

const ImagePlaceholder = styled(motion.div)`
  background-color: rgba(0, 0, 255, 0.25);
  grid-column: 1 / -2;
  padding-bottom: 60%;
  position: relative;

  @media (min-width: 1200px) {
    grid-column: 1 / 13;
    grid-row: 1 / 1;
  }

  @media (min-width: 1600px) {
    grid-column: 1 / 17;
  }
`;

const Type = styled.div`
  line-height: 1;
  mix-blend-mode: difference;
  position: absolute;
  left: 0.5rem;
  text-transform: uppercase;
  top: 0.5rem;
  writing-mode: vertical-rl;
`;

const Content = styled(motion.div)`
  grid-column: 2 / -3;
  margin-top: -1.5rem;
  mix-blend-mode: difference;

  @media (min-width: 800px) {
    margin-top: -2rem;
  }

  @media (min-width: 1200px) {
    align-self: center;
    grid-column: 11 / -2;
    grid-row: 1 / 1;
    margin-top: 0;
  }

  @media (min-width: 1600px) {
    grid-column: 14 / -2;
  }
`;

const Title = styled(motion.h2)`
  font-family: "Ultrasolar Web", "Inter", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
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

const Description = styled(motion.div)`
  max-width: 30rem;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
  position: absolute;
  right: ${(props) => props.theme.padding.md};
  top: 0;
  width: 1rem;

  @media (min-width: 800px) {
    font-size: 0.75rem;
    width: 1.25rem;
  }
`;

const Tag = styled.div`
  background-color: rgba(255, 255, 255, 0.25);
  color: #000000;
  line-height: 1;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.25rem;
  text-transform: uppercase;
  writing-mode: vertical-rl;
`;

export default function HomeProject() {
  // Image animation
  const {
    ref: imageRef,
    ctrls: imageCtrls,
    vars: imageVars,
  } = useAnimateIn({
    customVars: {
      hidden: { opacity: 0, x: `-2rem` },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          ease: `easeOut`,
        },
      },
    },
  });

  // Content animation
  const {
    ref: contentRef,
    ctrls: contentCtrls,
    vars: contentVars,
  } = useAnimateIn({
    delay: 0.1,
  });

  /*
  // Parallax framer-motion
  const { scrollYProgress } = useViewportScroll();
  const y1 = useTransform(scrollYProgress, [0, 2], [32, -32]);
  const y2 = useTransform(scrollYProgress, [0, 2], [32, -32]);
  */

  // Responsive parallax
  const isVertical = useMediaQuery("(max-width: 1200px)");
  const yOffset = isVertical ? [`0px`, `-40px`] : [`80px`, `-80px`];

  return (
    <Section>
      <SiteGrid relative>
        <ImagePlaceholder
          ref={imageRef}
          initial="hidden"
          animate={imageCtrls}
          variants={imageVars}
        >
          <Type>Interactive</Type>
        </ImagePlaceholder>
        <Content
          ref={contentRef}
          initial="hidden"
          animate={contentCtrls}
          variants={contentVars}
        >
          <Parallax y={yOffset}>
            <Title>
              Interstellar
              <br />
              Identity
            </Title>
            <Description>
              A project exploring language, communication, and design systems
              across the universe.
            </Description>
          </Parallax>
        </Content>
        <Tags>
          <Tag>Design</Tag>
          <Tag>Design Systems</Tag>
          <Tag>Communications</Tag>
        </Tags>
      </SiteGrid>
    </Section>
  );
}
