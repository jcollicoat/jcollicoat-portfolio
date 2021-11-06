import styled from "styled-components";
import Link from "next/link";

const CTA = styled.a`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-top: ${(props) => props.theme.padding.sm};
  opacity: 0.5;
  transition: opacity 0.25s ${(props) => props.theme.easeout};

  :hover {
    opacity: 1;
  }
`;

const CTAIcon = styled.svg`
  height: 1.5rem;
  margin-left: 0.5rem;
  width: 1.5rem;
`;

export default function CallToAction({ internalType, link, text, type }) {
  return (
    <>
      {type === "internal" && (
        <Link
          href={
            internalType === "project"
              ? `/projects/${link}`
              : internalType === "article"
              ? `/articles/${link}`
              : `/${link}`
          }
          passHref
          scroll={false}
        >
          <CTA>
            {text}
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
      {type === "file" && (
        <CTA href={link} rel="noopener noreferrer" target="_blank">
          {text}
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
      {type === "external" && (
        <CTA href={link} rel="noopener noreferrer" target="_blank">
          {link}
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
    </>
  );
}
