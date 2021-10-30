import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

import useAnimateIn from "../../hooks/useAnimateIn";

import SiteGrid from "../SiteGrid";

const Section = styled.section`
  margin: 10rem 0;
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

const CTA = styled.a`
  align-items: center;
  cursor: pointer;
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
  margin-left: 0.5rem;
  width: 1.5rem;
`;

export default function ProjectText({ data }) {
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
        <Copy
          ref={copyRef}
          initial="hidden"
          animate={copyCtrls}
          variants={copyVars}
        >
          <CopyHeading>{data.heading}</CopyHeading>
          <CopyParagraph>{data.copy}</CopyParagraph>
          {data.include_cta === "internal" && (
            // eslint-disable-next-line @next/next/link-passhref
            <Link
              href={
                data.link_internal_type === "project"
                  ? `/projects/${data.link_internal}`
                  : data.link_internal_type === "article"
                  ? `/articles/${data.link_internal}`
                  : `/${data.link_internal}`
              }
              scroll={false}
            >
              <CTA>
                {data.cta_text}
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
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </CTAIcon>
              </CTA>
            </Link>
          )}
          {data.include_cta === "external" && (
            <CTA
              href={data.link_external}
              rel="noopener noreferrer"
              target="_blank"
            >
              {data.cta_text}
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </CTAIcon>
            </CTA>
          )}
        </Copy>
      </SiteGrid>
    </Section>
  );
}
