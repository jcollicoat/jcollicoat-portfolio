import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import useMediaQuery from "../../hooks/useMediaQuery";
import useAnimateIn from "../../hooks/useAnimateIn";
import useFadeIn from "../../hooks/useFadeIn";

import SiteGrid from "../SiteGrid";

const Section = styled.section`
  margin: 0 0 10rem 0;
`;

const ImageContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.background};
  grid-column: 13 / -1;
  margin-bottom: 2rem;
  position: relative;

  img {
    border-radius: 50%;
  }

  @media (min-width: 800px) {
    grid-column: 16 / -1;
  }

  @media (min-width: 1200px) {
    grid-column: 13 / span 6;
  }

  @media (min-width: 1600px) {
    grid-column: 12 / span 5;
  }
`;

const TitleParallax = styled(Parallax)`
  grid-column: 1 / -1;
  margin-top: ${(props) => (props.image ? "-4rem" : "0")};

  @media (min-width: 800px) {
    grid-column: 4 / 21;
    margin-top: ${(props) => (props.image ? "-8rem" : "0")};
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

const TitleWord = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const TitleCharacter = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

const Intro = styled(motion.p)`
  grid-column: 1 / -1;
  line-height: 1.75;
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

export default function HeroPage({ data }) {
  // Title animation
  const titleCtrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      titleCtrls.start("visible");
    }
    if (!inView) {
      titleCtrls.start("hidden");
    }
  }, [titleCtrls, inView]);

  const titleWordAnimation = {
    hidden: {},
    visible: {},
  };

  const titleCharacterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
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

  // Intro animation
  const {
    ref: introRef,
    ctrls: introCtrls,
    vars: introVars,
  } = useAnimateIn({
    delay: 0.75,
    threshold: 0.5,
  });

  // Image animation
  const {
    ref: imageRef,
    ctrls: imageCtrls,
    vars: imageVars,
  } = useFadeIn({
    delay: 0.5,
    threshold: 0.5,
  });

  return (
    <Section>
      <SiteGrid>
        {data.include_image === true && (
          <ImageContainer
            ref={imageRef}
            initial="hidden"
            animate={imageCtrls}
            variants={imageVars}
          >
            <Image
              src={data.image}
              blurDataURL={`${data.image}?w=10`}
              alt={`Hey look, it's me!`}
              height={data.image_dimensions.height}
              layout="responsive"
              objectFit="contain"
              quality="100"
              placeholder="blur"
              width={data.image_dimensions.width}
            />
          </ImageContainer>
        )}
        <TitleParallax image={data.include_image} y={yOffset}>
          <Title aria-label={data.title} role="heading">
            {data.title.split(" ").map((word, index) => {
              return (
                <TitleWord
                  ref={ref}
                  aria-hidden="true"
                  key={index}
                  initial="hidden"
                  animate={titleCtrls}
                  variants={titleWordAnimation}
                  transition={{
                    delayChildren: index * 0.25,
                    staggerChildren: 0.05,
                  }}
                >
                  {word.split("").map((character, index) => {
                    return (
                      <TitleCharacter
                        aria-hidden="true"
                        key={index}
                        variants={titleCharacterAnimation}
                      >
                        {character}
                      </TitleCharacter>
                    );
                  })}
                </TitleWord>
              );
            })}
          </Title>
        </TitleParallax>
        <Intro
          ref={introRef}
          initial="hidden"
          animate={introCtrls}
          variants={introVars}
        >
          {data.intro}
        </Intro>
      </SiteGrid>
    </Section>
  );
}
