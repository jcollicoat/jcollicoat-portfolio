import { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

import SiteGrid from "../SiteGrid";

const Section = styled.section`
  margin: 10rem 0;
`;

const Headings = styled.div`
  grid-column: 4 / -4;
  margin-bottom: ${(props) => props.theme.padding.lg};
  max-width: 40rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5em;

  @media (min-width: 800px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 3rem;
  }
`;

const Copy = styled.p`
  line-height: 1.75;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  grid-column: 1 / -1;
  width: 100%;
`;

const Embla = styled.div`
  position: relative;
`;

const EmblaViewport = styled.div`
  overflow: hidden;

  &.is-draggable {
    cursor: move;
    cursor: grab;
  }

  &.is-dragging {
    cursor: grabbing;
  }
`;

const EmblaContainer = styled.div`
  display: flex;
  will-change: transform;
`;

const EmblaSlide = styled.div`
  flex: 0 0 auto;
  max-width: 50rem;
  width: 100%;
`;

const EmblaSlideInner = styled.div`
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(24, 1fr);
  padding: ${(props) => props.theme.padding.lg} 0;
`;

const ItemImage = styled.div`
  grid-column: 1 / -1;
  margin: 0 ${(props) => props.theme.padding.lg}
    ${(props) => props.theme.padding.md} ${(props) => props.theme.padding.lg};
  padding-bottom: 56.25%;
  position: relative;
`;

const ItemHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  grid-column: 1 / -1;
  margin: 0 ${(props) => props.theme.padding.lg} 0.5em;
  max-width: 40rem;
`;

const ItemCopy = styled.p`
  grid-column: 1 / -1;
  line-height: 1.75;
  margin: 0 ${(props) => props.theme.padding.lg};
  max-width: 40rem;
`;

const ItemCTA = styled.a`
  align-items: center;
  cursor: pointer;
  display: flex;
  grid-column: 1 / -1;
  margin: ${(props) => props.theme.padding.sm}
    ${(props) => props.theme.padding.lg} 0;
  opacity: 0.5;
  transition: opacity 0.25s ease-out;

  :hover {
    opacity: 1;
  }
`;

const ItemCTAIcon = styled.svg`
  height: 1.5rem;
  margin-left: 0.5rem;
  width: 1.5rem;
`;

const Navigation = styled.div`
  align-items: center;
  display: flex;
  grid-column: 1 / -1;
  justify-content: flex-end;
  padding: 0 ${(props) => props.theme.padding.lg}
    ${(props) => props.theme.padding.lg} ${(props) => props.theme.padding.lg};
`;

const buttonCSS = css`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  height: 2.5rem;
  outline: none;
  padding: 0;
  transition: opacity 0.25s ease-out;
  width: 2.5rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;
  }
`;

const PrevButton = styled.button`
  ${buttonCSS};
  margin-right: 1rem;
`;

const NextButton = styled.button`
  ${buttonCSS};
`;

export default function ProjectProcessWork({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };
    if (emblaApi) {
      emblaApi.on("select", onSelect);
      onSelect();
    }
  }, [emblaApi]);

  return (
    <Section>
      <SiteGrid>
        <Headings>
          <Title>Process Work</Title>
          <Copy>Explore process work for this project.</Copy>
        </Headings>
      </SiteGrid>
      <SiteGrid overflow="right">
        <Container>
          <Embla>
            <EmblaViewport ref={emblaRef}>
              <EmblaContainer>
                {data.items.map((item, index) => (
                  <EmblaSlide key={index}>
                    <EmblaSlideInner>
                      <ItemImage>
                        {item.image.includes(".svg") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image}
                            alt={item.image_is_decorative ? "" : item.image_alt}
                          />
                        ) : (
                          <Image
                            src={item.image}
                            blurDataURL={`${item.image}?w=10`}
                            alt={item.image_is_decorative ? "" : item.image_alt}
                            layout="fill"
                            objectFit="cover"
                            quality="100"
                            placeholder="blur"
                          />
                        )}
                      </ItemImage>
                      <ItemHeading>{item.heading}</ItemHeading>
                      <ItemCopy>{item.copy}</ItemCopy>
                      {item.include_cta === "internal" && (
                        // eslint-disable-next-line @next/next/link-passhref
                        <Link
                          href={
                            item.link_internal_type === "project"
                              ? `/projects/${item.link_internal}`
                              : item.link_internal_type === "article"
                              ? `/articles/${item.link_internal}`
                              : `/${item.link_internal}`
                          }
                          scroll={false}
                        >
                          <ItemCTA>
                            {item.cta_text}
                            <ItemCTAIcon
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
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </ItemCTAIcon>
                          </ItemCTA>
                        </Link>
                      )}
                      {item.include_cta === "external" && (
                        <ItemCTA
                          href={item.link_external}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {item.cta_text}
                          <ItemCTAIcon
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
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </ItemCTAIcon>
                        </ItemCTA>
                      )}
                    </EmblaSlideInner>
                  </EmblaSlide>
                ))}
              </EmblaContainer>
            </EmblaViewport>
          </Embla>
          <Navigation>
            <PrevButton onClick={scrollPrev} disabled={!prevBtnEnabled}>
              <svg
                alt="Previous Slide"
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 5 12 12 19"></polyline>
              </svg>
            </PrevButton>
            <NextButton onClick={scrollNext} disabled={!nextBtnEnabled}>
              <svg
                alt="Next Slide"
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </NextButton>
          </Navigation>
        </Container>
      </SiteGrid>
    </Section>
  );
}
