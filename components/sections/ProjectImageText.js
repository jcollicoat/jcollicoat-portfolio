import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

import useAnimateIn from "../../hooks/useAnimateIn";

import SiteGrid from "../SiteGrid";

import CallToAction from "../CallToAction";

const Section = styled.section`
  margin: 10rem 0;
`;

const ImageContainer = styled(motion.div)`
  align-self: center;
  grid-column: 1 / -1;
  height: auto;
  position: relative;

  @media (min-width: 800px) {
    grid-column: ${(props) => (props.copy === "right" ? "1 / 13" : "13 / -1")};
  }
`;

const Caption = styled.div`
  font-size: 0.9rem;
  grid-column: 1 / -1;
  line-height: 1.5;
  margin: 0 auto 0 auto;
  margin-top: ${(props) => props.theme.padding.md};
  max-width: 30rem;
  opacity: 0.5;
  text-align: center;

  @media (min-width: 800px) {
    margin-left: ${(props) => (props.copy === "right" ? "0" : "auto")};
    margin-right: ${(props) => (props.copy === "left" ? "0" : "auto")};
    text-align: ${(props) => (props.copy === "right" ? "left" : "right")};
  }
`;

const CaptionLabel = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

const Copy = styled(motion.div)`
  align-self: center;
  grid-column: 1 / -1;
  margin: ${(props) => props.theme.padding.lg} auto;
  max-width: 40rem;
  order: ${(props) => props.position === "left" && -1};
  width: 100%;

  @media (min-width: 800px) {
    grid-column: ${(props) =>
      props.position === "right" ? "14 / -1" : "1 / 12"};
  }
`;

const CopyHeading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.05em;
  margin-bottom: 0.5em;

  @media (min-width: 800px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 3rem;
  }
`;

const CopyParagraph = styled.p`
  line-height: 1.75;
`;

export default function ProjectImageText({ data }) {
  // Image animation
  const {
    ref: imageRef,
    ctrls: imageCtrls,
    vars: imageVars,
  } = useAnimateIn({
    threshold: 0.25,
  });

  // Copy animation
  const {
    ref: copyRef,
    ctrls: copyCtrls,
    vars: copyVars,
  } = useAnimateIn({
    threshold: 0.5,
  });

  return (
    <Section>
      <SiteGrid>
        <ImageContainer
          ref={imageRef}
          initial="hidden"
          animate={imageCtrls}
          variants={imageVars}
          copy={data.copy_position}
        >
          {data.image.includes(".svg") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt={data.image_is_decorative ? "" : data.image_alt}
            />
          ) : (
            <Image
              src={data.image}
              blurDataURL={`${data.image}?w=10`}
              alt={data.image_is_decorative ? "" : data.image_alt}
              height={data.image_dimensions.height}
              layout="responsive"
              objectFit="contain"
              quality="100"
              placeholder="blur"
              width={data.image_dimensions.width}
            />
          )}
          {data.include_caption && (
            <Caption copy={data.copy_position}>
              <CaptionLabel>Above</CaptionLabel>
              {data.caption}
            </Caption>
          )}
        </ImageContainer>
        <Copy
          ref={copyRef}
          initial="hidden"
          animate={copyCtrls}
          variants={copyVars}
          position={data.copy_position}
        >
          <CopyHeading>{data.copy_heading}</CopyHeading>
          <CopyParagraph>{data.copy}</CopyParagraph>
          {data.include_cta !== "none" && (
            <CallToAction
              internalType={
                data.include_cta === "internal" ? data.link_internal_type : null
              }
              link={
                data.include_cta === "internal"
                  ? data.link_internal
                  : data.include_cta === "file"
                  ? data.link_file
                  : data.link_external
              }
              text={data.cta_text}
              type={data.include_cta}
            />
          )}
        </Copy>
      </SiteGrid>
    </Section>
  );
}
