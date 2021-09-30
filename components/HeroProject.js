import styled from "styled-components";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

import useFadeIn from "../hooks/useFadeIn";

import SiteGrid from "./global/SiteGrid";

const Section = styled.section`
  margin: 15rem 0 10rem 0;
`;

const Title = styled.h1`
  font-family: "Ultrasolar Web";
  font-size: 4rem;
  font-weight: 400;
  grid-column: 1 / -1;
  margin-bottom: 1rem;

  @media (min-width: 800px) {
    font-size: 6rem;
    grid-column: 4 / 17;
  }

  @media (min-width: 1200px) {
    font-size: 8rem;
  }

  @media (min-width: 1600px) {
    font-size: 10rem;
  }
`;

const Content = styled.div`
  grid-column: 1 / -1;
  max-width: 40rem;
  padding-left: 2rem;
  position: relative;

  @media (min-width: 800px) {
    grid-column: 6 / -1;
    padding-left: 3rem;
  }

  @media (min-width: 1200px) {
    grid-column: 8 / -1;
  }

  @media (min-width: 1600px) {
    grid-column: 10 / -1;
  }
`;

const Intro = styled.p`
  line-height: 1.75;
`;

const TagsParallax = styled(Parallax)`
  left: 0;
  position: absolute;
  top: 0;
`;

const Tags = styled(motion.div)`
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
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

export default function HeroProject({ data }) {
  // Title animation
  const {
    ref: titleRef,
    ctrls: titleCtrls,
    vars: titleVars,
  } = useFadeIn({
    threshold: 0.5,
  });

  // Intro animation
  const {
    ref: introRef,
    ctrls: introCtrls,
    vars: introVars,
  } = useFadeIn({
    threshold: 0.5,
  });

  const introYOffset = [`0px`, `40px`];

  // Tags animation
  const {
    ref: tagsRef,
    ctrls: tagsCtrls,
    vars: tagsVars,
  } = useFadeIn({
    threshold: 0.5,
  });

  const tagsYOffset = [`0px`, `80px`];

  return (
    <Section>
      <SiteGrid>
        <Title>{data.name}</Title>
        <Content>
          <Parallax y={introYOffset}>
            <Intro>{data.intro}</Intro>
          </Parallax>
          <TagsParallax y={tagsYOffset}>
            <Tags
              ref={tagsRef}
              initial="hidden"
              animate={tagsCtrls}
              variants={tagsVars}
            >
              {data.tags.map((tag, index) => {
                return <Tag key={index}>{tag.name}</Tag>;
              })}
            </Tags>
          </TagsParallax>
        </Content>
      </SiteGrid>
    </Section>
  );
}
