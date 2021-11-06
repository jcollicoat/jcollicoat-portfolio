import Lottie from "react-lottie";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import AnchorLink from "react-anchor-link-smooth-scroll";

import useAnimateIn from "../../hooks/useAnimateIn";
import useMediaQuery from "../../hooks/useMediaQuery";

import SiteGrid from "../SiteGrid";

import * as josephData from "../../lotties/joseph.json";
import * as collicoatData from "../../lotties/collicoat.json";

const Section = styled.section`
  margin: 0 0 10rem 0;
`;

const Joseph = styled.div`
  grid-column: 1 / -1;

  @media (min-width: 800px) {
    grid-column: 1 / 13;
    grid-row: 1 / 3;
  }

  @media (min-width: 1200px) {
    grid-column: 3 / 13;
  }

  @media (min-width: 1600px) {
    grid-column: 4 / 13;
  }
`;

const Collicoat = styled.div`
  grid-column: 1 / -1;

  @media (min-width: 800px) {
    grid-column: 13 / -1;
    grid-row: 2 / 5;
  }

  @media (min-width: 1200px) {
    grid-column: 13 / -3;
  }

  @media (min-width: 1600px) {
    grid-column: 13 / -4;
  }
`;

const Intro = styled(motion.div)`
  grid-column: 1 / -1;
  margin-top: ${(props) => props.theme.padding.lg};
  max-width: 30rem;
  //mix-blend-mode: difference;

  @media (min-width: 400px) {
    grid-column: 2 / -2;
  }

  @media (min-width: 800px) {
    grid-column: 1 / 11;
    grid-row: 3 / 3;
  }

  @media (min-width: 1200px) {
    grid-column: 3 / 9;
  }

  @media (min-width: 1600px) {
    grid-column: 4 / 10;
  }
`;

const Heading = styled.h1`
  font-weight: 600;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  line-height: 1.25;
`;

const CTA = styled(AnchorLink)`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-top: ${(props) => props.theme.padding.sm};
  opacity: 0.5;
  transition: opacity 0.25s ${(props) => props.theme.easeout};

  :hover {
    opacity: 1;
  }
`;

const CTAIcon = styled.svg`
  height: 1.5rem;
  margin-right: 0.5rem;
  width: 1.5rem;
`;

export default function HeroHome({ data }) {
  // Media query for parallax
  const isSmall = useMediaQuery("(max-width: 800px)");

  // Intro parallax
  const introYOffset = isSmall ? [`0px`, `-20px`] : [`20px`, `-20px`];

  // Intro animation
  const {
    ref: introRef,
    ctrls: introCtrls,
    vars: introVars,
  } = useAnimateIn({ delay: 0.25 });

  return (
    <Section>
      <SiteGrid>
        <Joseph>
          <Lottie
            isClickToPauseDisabled={true}
            options={{
              animationData: josephData,
              autoplay: true,
              loop: true,
            }}
          />
        </Joseph>
        <Collicoat>
          <Lottie
            isClickToPauseDisabled={true}
            options={{
              animationData: collicoatData,
              autoplay: true,
              loop: true,
            }}
          />
        </Collicoat>
        <Intro
          ref={introRef}
          initial="hidden"
          animate={introCtrls}
          variants={introVars}
        >
          <Parallax y={introYOffset}>
            <Heading>{data.heading}</Heading>
            <Subheading>{data.intro}</Subheading>
            <CTA href="#projects-list" offset="160">
              <CTAIcon
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </CTAIcon>
              {data.cta}
            </CTA>
          </Parallax>
        </Intro>
      </SiteGrid>
    </Section>
  );
}
