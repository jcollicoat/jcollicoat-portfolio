import styled from "styled-components";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import Image from "next/image";
import Link from "next/link";

import useFadeIn from "../hooks/useFadeIn";
import useAnimateIn from "../hooks/useAnimateIn";
import useMediaQuery from "../hooks/useMediaQuery";

import SiteGrid from "./SiteGrid";

import ProjectTitle from "./ProjectTitle";

const Section = styled.section`
  margin: 10rem 0;
`;

const ImageContainer = styled(motion.div)`
  background-color: #000000;
  grid-column: ${(props) => (props.reversed ? `3 / -1` : `1 / -3`)};
  opacity: 0.5;
  position: relative;

  @media (min-width: 1200px) {
    grid-column: ${(props) => (props.reversed ? `-1 / -17` : `1 / 17`)};
    grid-row: 1 / 1;
  }

  @media (min-width: 1600px) {
    grid-column: ${(props) => (props.reversed ? `-1 / -19` : `1 / 19`)};
  }
`;

const ImageOverlay = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.75) 100%
  );
  background-position: ${(props) => (props.reversed ? `0% 0%` : `100% 0%`)};
  background-size: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 1s ease;

  ${Section}:hover & {
    opacity: 0.5;
  }

  @media (min-width: 1200px) {
    background: ${(props) =>
      props.reversed
        ? `linear-gradient(
    to left,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.75) 100%
  )`
        : `linear-gradient(
    to right,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.75) 100%
  )`};
    background-position: ${(props) => (props.reversed ? `0% 0%` : `100% 0%`)};
    background-size: 200% 100%;
  }
`;

const Type = styled.div`
  left: ${(props) => (props.reversed ? `auto` : `0.5rem`)};
  line-height: 1;
  //mix-blend-mode: difference;
  opacity: 1;
  position: absolute;
  right: ${(props) => (props.reversed ? `0.5rem` : `auto`)};
  text-transform: uppercase;
  top: 0.5rem;
  writing-mode: vertical-rl;
  z-index: 1;
`;

const Content = styled.div`
  grid-column: ${(props) => (props.reversed ? `5 / -3` : `3 / -5`)};
  margin-top: -1.5rem;
  //mix-blend-mode: difference;

  @media (min-width: 800px) {
    margin-top: -2rem;
  }

  @media (min-width: 1200px) {
    align-self: center;
    grid-column: ${(props) => (props.reversed ? `2 / -16` : `16 / -2`)};
    grid-row: 1 / 1;
    margin-top: 0;
  }
`;

const Description = styled(motion.p)`
  line-height: 1.25;
  max-width: 30rem;
`;

const Tags = styled(motion.div)`
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
  left: ${(props) => (props.reversed ? props.theme.padding.md : `auto`)};
  position: absolute;
  right: ${(props) => (props.reversed ? `auto` : props.theme.padding.md)};
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

export default function Project({ project, reversed }) {
  // Media query for parallax
  const isSmall = useMediaQuery("(max-width: 1200px)");

  // Image animation
  const {
    ref: imageRef,
    ctrls: imageCtrls,
    vars: imageVars,
  } = useFadeIn({
    threshold: 0.25,
  });

  // Content parallax
  const contentYOffset = isSmall ? [`0px`, `-80px`] : [`80px`, `-80px`];

  // Intro animation
  const {
    ref: introRef,
    ctrls: introCtrls,
    vars: introVars,
  } = useAnimateIn({
    delay: 0.5,
    threshold: 0.5,
  });

  // Tags animation
  const {
    ref: tagsRef,
    ctrls: tagsCtrls,
    vars: tagsVars,
  } = useAnimateIn({
    delay: 0.75,
    threshold: 0.5,
  });

  return (
    <Section>
      <Link href={`/projects/${project.slug}`} scroll={false}>
        <a>
          <SiteGrid relative>
            <ImageContainer
              ref={imageRef}
              initial="hidden"
              animate={imageCtrls}
              variants={imageVars}
              reversed={reversed}
            >
              <Image
                src={project.image}
                blurDataURL={`${project.image}?w=10`}
                alt=""
                height={project.image_dimensions.height}
                layout="responsive"
                objectFit="contain"
                quality="100"
                placeholder="blur"
                width={project.image_dimensions.width}
              />
              <ImageOverlay reversed={reversed} />
              {project.is_interactive && (
                <Type reversed={reversed}>Interactive</Type>
              )}
            </ImageContainer>
            <Content reversed={reversed}>
              <Parallax y={contentYOffset}>
                <ProjectTitle title={project.name} />
                <Description
                  ref={introRef}
                  initial="hidden"
                  animate={introCtrls}
                  variants={introVars}
                >
                  {project.description}
                </Description>
              </Parallax>
            </Content>
            <Tags
              ref={tagsRef}
              initial="hidden"
              animate={tagsCtrls}
              variants={tagsVars}
              reversed={reversed}
            >
              {project.tags.map((tag, index) => {
                return <Tag key={index}>{tag.name}</Tag>;
              })}
            </Tags>
          </SiteGrid>
        </a>
      </Link>
    </Section>
  );
}
