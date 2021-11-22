import styled from "styled-components";
import { motion } from "framer-motion";

import useAnimateIn from "../../hooks/useAnimateIn";

import SiteGrid from "../SiteGrid";

import CallToAction from "../CallToAction";

const Section = styled.section`
  margin: 10rem 0;
`;

const VideoContainer = styled(motion.div)`
  grid-column: 1 / -1;
  height: 0;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;

  @media (min-width: 800px) {
    grid-column: ${(props) => {
      if (props.size === "small") {
        return "7 / -7";
      } else if (props.size === "medium") {
        return "4 / -4";
      }
    }};
  }
`;

const VideoEmbed = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
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
    margin-left: ${(props) => (props.position === "left" ? "0" : "auto")};
    margin-right: ${(props) => (props.position === "right" ? "0" : "auto")};
    text-align: ${(props) => props.position};
  }
`;

const CaptionLabel = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

const Copy = styled(motion.div)`
  grid-column: 1 / -1;
  margin: ${(props) => props.theme.padding.lg} auto;
  max-width: 40rem;
  width: 100%;
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

export default function ProjectVideo({ data }) {
  // Video animation
  const {
    ref: videoRef,
    ctrls: videoCtrls,
    vars: videoVars,
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
      {data.include_copy && data.copy_position === "above" && (
        <SiteGrid>
          <Copy
            ref={copyRef}
            initial="hidden"
            animate={copyCtrls}
            variants={copyVars}
          >
            <CopyHeading>{data.copy_heading}</CopyHeading>
            <CopyParagraph>{data.copy}</CopyParagraph>
            {data.include_cta !== "none" && (
              <CallToAction
                internalType={
                  data.include_cta === "internal"
                    ? data.link_internal_type
                    : null
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
      )}
      <SiteGrid>
        <VideoContainer
          ref={videoRef}
          initial="hidden"
          animate={videoCtrls}
          variants={videoVars}
          size={data.video_size}
        >
          <VideoEmbed
            src={`https://player.vimeo.com/video/${data.video}`}
            frameborder="0"
            webkitAllowFullScreen
            mozallowfullscreen
            allowFullScreen
          ></VideoEmbed>
        </VideoContainer>
      </SiteGrid>
      {data.include_caption && (
        <SiteGrid>
          <Caption position={data.caption_position}>
            <CaptionLabel>Above</CaptionLabel>
            {data.caption}
          </Caption>
        </SiteGrid>
      )}
      {data.include_copy && data.copy_position === "below" && (
        <SiteGrid>
          <Copy
            ref={copyRef}
            initial="hidden"
            animate={copyCtrls}
            variants={copyVars}
          >
            <CopyHeading>{data.copy_heading}</CopyHeading>
            <CopyParagraph>{data.copy}</CopyParagraph>
            {data.include_cta !== "none" && (
              <CallToAction
                internalType={
                  data.include_cta === "internal"
                    ? data.link_internal_type
                    : null
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
      )}
    </Section>
  );
}
