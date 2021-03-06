import styled from "styled-components";
import { rgba } from "polished";
import { motion } from "framer-motion";

import useAnimateIn from "../hooks/useAnimateIn";

import SiteGrid from "./SiteGrid";

import HeroProjectTitle from "./HeroProjectTitle";

const Section = styled.section`
  margin: 0 0 10rem 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row-reverse;
  grid-column: 1 / -1;
  max-width: 40rem;

  @media (min-width: 800px) {
    grid-column: 6 / -1;
  }

  @media (min-width: 1200px) {
    grid-column: 8 / -1;
  }

  @media (min-width: 1600px) {
    grid-column: 10 / -1;
  }
`;

const Intro = styled(motion.p)`
  line-height: 1.75;
`;

const Tags = styled(motion.div)`
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
  margin-right: 1rem;
  width: 1rem;

  @media (min-width: 800px) {
    font-size: 0.75rem;
    margin-right: 1.75rem;
    width: 1.25rem;
  }
`;

const Tag = styled.div`
  background-color: ${(props) => rgba(props.theme.text, 0.25)};
  color: ${(props) => props.theme.background};
  line-height: 1;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.25rem;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  width: 1rem;

  @media (min-width: 800px) {
    width: 1.25rem;
  }
`;

export default function HeroProject({ data }) {
  // Intro animation
  const {
    ref: introRef,
    ctrls: introCtrls,
    vars: introVars,
  } = useAnimateIn({
    delay: 0.75,
    threshold: 0.5,
  });

  // Tags animation
  const {
    ref: tagsRef,
    ctrls: tagsCtrls,
    vars: tagsVars,
  } = useAnimateIn({
    delay: 0.5,
    threshold: 0.5,
  });

  return (
    <Section>
      <SiteGrid>
        <HeroProjectTitle title={data.name} />
        <Content>
          <Intro
            ref={introRef}
            initial="hidden"
            animate={introCtrls}
            variants={introVars}
          >
            {data.intro}
          </Intro>
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
        </Content>
      </SiteGrid>
    </Section>
  );
}
