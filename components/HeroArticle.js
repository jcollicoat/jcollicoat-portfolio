import styled from "styled-components";
import Image from "next/image";

import SiteGrid from "./SiteGrid";

const Section = styled.section`
  margin: 0 0 10rem 0;
`;

const ImageContainer = styled.div`
  background-color: #ffffff;
  grid-column: 1 / -1;
  position: relative;

  @media (min-width: 800px) {
    grid-column: 3 / -3;
  }

  @media (min-width: 1200px) {
    grid-column: 1 / 14;
    grid-row: 1 / 1;
  }

  @media (min-width: 1600px) {
    grid-column: 3 / 14;
  }
`;

const Content = styled.div`
  background-color: #ffffff;
  box-shadow: 0rem 1rem 1rem -0.5rem rgba(0, 0, 0, 0.05);
  grid-column: 2 / -2;
  margin-top: -2rem;
  padding: 1.5rem;
  position: relative;

  @media (min-width: 800px) {
    grid-column: 4 / -4;
    margin-top: -2rem;
  }

  @media (min-width: 1200px) {
    align-self: center;
    grid-column: 13 / -1;
    grid-row: 1 / 1;
    margin-top: 0;
    padding: 3rem;
  }

  @media (min-width: 1600px) {
    grid-column: 13 / -3;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;

  @media (min-width: 800px) {
    font-size: 3rem;
  }

  @media (min-width: 1200px) {
    font-size: 3.5rem;
    line-height: 0.9;
  }
`;

const Tags = styled.div`
  display: flex;
  font-size: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 800px) {
    font-size: 0.75rem;
  }
`;

const Tag = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  color: #000000;
  line-height: 1;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  text-transform: uppercase;
`;

const Intro = styled.p`
  line-height: 1.25;
  max-width: 30rem;
`;

export default function HeroArticle({ data }) {
  return (
    <Section>
      <SiteGrid>
        <ImageContainer>
          <Image
            src={data.image}
            blurDataURL={`${data.image}?w=10`}
            alt=""
            height={data.image_dimensions.height}
            layout="responsive"
            objectFit="contain"
            quality="100"
            placeholder="blur"
            width={data.image_dimensions.width}
          />
        </ImageContainer>
        <Content>
          <Title>{data.name}</Title>
          <Tags>
            {data.tags.map((tag, index) => {
              return <Tag key={index}>{tag.name}</Tag>;
            })}
          </Tags>
          <Intro>{data.intro}</Intro>
        </Content>
      </SiteGrid>
    </Section>
  );
}
