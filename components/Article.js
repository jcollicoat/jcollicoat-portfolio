import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import SiteGrid from "./SiteGrid";

const Content = styled.div`
  background-color: #ffffff;
  box-shadow: 0rem 1rem 1rem -0.5rem rgba(0, 0, 0, 0.05);
  grid-column: 3 / -1;
  margin-top: -2rem;
  padding: 1.5rem;
  position: relative;
  transition: box-shadow 1s ${(props) => props.theme.easeout};

  :hover {
    box-shadow: 0rem 1rem 2rem 0rem rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 800px) {
    grid-column: 6 / -3;
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

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
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

const Description = styled.p`
  line-height: 1.25;
  max-width: 30rem;
`;

const ImageContainer = styled.div`
  background-color: #ffffff;
  grid-column: 1 / -3;
  position: relative;

  :hover {
    + ${Content} {
      box-shadow: 0rem 1rem 2rem 0rem rgba(0, 0, 0, 0.1);
    }
  }

  @media (min-width: 800px) {
    grid-column: 3 / -6;
  }

  @media (min-width: 1200px) {
    grid-column: 1 / 14;
    grid-row: 1 / 1;
  }

  @media (min-width: 1600px) {
    grid-column: 3 / 14;
  }
`;

export default function Article({ article }) {
  return (
    <Link href={`/articles/${article.slug}`} scroll={false}>
      <a>
        <SiteGrid>
          <ImageContainer>
            <Image
              src={article.image}
              blurDataURL={`${article.image}?w=10`}
              alt=""
              height={article.image_dimensions.height}
              layout="responsive"
              objectFit="contain"
              quality="100"
              placeholder="blur"
              width={article.image_dimensions.width}
            />
          </ImageContainer>
          <Content>
            <Title>{article.name}</Title>
            <Tags>
              {article.tags.map((tag, index) => {
                return <Tag key={index}>{tag.name}</Tag>;
              })}
            </Tags>
            <Description>{article.description}</Description>
          </Content>
        </SiteGrid>
      </a>
    </Link>
  );
}
