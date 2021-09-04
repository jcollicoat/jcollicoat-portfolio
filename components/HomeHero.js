import Lottie from "react-lottie";
import styled from "styled-components";

import SiteGrid from "./global/SiteGrid";

import * as josephData from "../lotties/joseph.json";
import * as collicoatData from "../lotties/collicoat.json";

const Section = styled.section`
  margin-bottom: 10rem;
  mix-blend-mode: difference;
  padding-top: 10rem;
`;

const Joseph = styled.div`
  grid-column: 1 / -1;

  @media (min-width: 800px) {
    grid-column: 1 / 9;
    grid-row: 1 / 3;
  }

  @media (min-width: 1200px) {
    grid-column: 2 / 11;
  }

  @media (min-width: 1600px) {
    grid-column: 4 / 13;
  }
`;

const Collicoat = styled.div`
  grid-column: 1 / -1;

  @media (min-width: 800px) {
    grid-column: 9 / -1;
    grid-row: 2 / 5;
  }

  @media (min-width: 1200px) {
    grid-column: 11 / -2;
  }

  @media (min-width: 1600px) {
    grid-column: 13 / -4;
  }
`;

const Intro = styled.div`
  grid-column: 1 / -1;
  margin-top: ${(props) => props.theme.padding.lg};

  @media (min-width: 400px) {
    grid-column: 2 / -2;
  }

  @media (min-width: 800px) {
    grid-column: 1 / 7;
    grid-row: 3 / 3;
  }

  @media (min-width: 1200px) {
    grid-column: 2 / 8;
  }

  @media (min-width: 1600px) {
    grid-column: 4 / 10;
  }
`;

const Name = styled.h1`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CTA = styled.a`
  align-items: center;
  display: flex;
  margin-top: ${(props) => props.theme.padding.sm};
  opacity: 0.5;
  transition: opacity 0.25s ease-out;

  :hover {
    opacity: 1;
  }
`;

const CTAIcon = styled.svg`
  height: 1.5rem;
  margin-right: 0.5rem;
  width: 1.5rem;
`;

export default function HomeHero() {
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
        <Intro>
          <Name>{`I'm Joseph,`}</Name>
          <p>
            a web developer and graphic designer with a passion for everything
            digital.
          </p>
          <CTA>
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
            Check out my work
          </CTA>
        </Intro>
      </SiteGrid>
    </Section>
  );
}
