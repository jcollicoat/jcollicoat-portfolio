import styled from "styled-components";

import SiteGrid from "./global/SiteGrid";

const Section = styled.section`
  margin: 10rem 0;
`;

const ImagePlaceholder = styled.div`
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

const Content = styled.div`
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

const Title = styled.h2`
  font-family: "Ultrasolar Trial";
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

const Description = styled.div`
  max-width: 30rem;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  position: absolute;
  right: ${(props) => props.theme.padding.md};
  top: 0;
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
  return (
    <Section>
      <SiteGrid relative>
        <ImagePlaceholder>
          <Type>Interactive</Type>
        </ImagePlaceholder>
        <Content>
          <Title>
            Interstellar
            <br />
            Identity
          </Title>
          <Description>
            A project exploring language, communication, and design systems
            across the universe.
          </Description>
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
