import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import styled, { css } from "styled-components";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import SiteGrid from "../SiteGrid";
import ArticleComponent from "../ArticleComponent";

const Section = styled.section`
  margin: 10rem 0;
`;

const Wrapper = styled.article`
  grid-column: 1 / -1;
  margin: 0 auto;
  max-width: 45rem;
  width: 100%;
`;

const HeadingCSS = css`
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.25;
  margin: 1.5em 0 1em 0;
`;

const Heading2 = styled.h2`
  ${HeadingCSS};
  font-size: 2.25rem;

  @media (min-width: 800px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 3rem;
  }
`;

const Heading3 = styled.h3`
  ${HeadingCSS};
  font-size: 2rem;
`;

const Heading4 = styled.h4`
  ${HeadingCSS};
  font-size: 1.75rem;
`;

const Heading5 = styled.h5`
  ${HeadingCSS};
  font-size: 1.5rem;
`;

const Heading6 = styled.h6`
  ${HeadingCSS};
  font-size: 1.25rem;
`;

const Paragraph = styled.p`
  line-height: 1.75;
  margin: 1em 0;
`;

const ListCSS = css`
  margin: 1.5em 0;
  line-height: 1.75;
`;

const UnorderedList = styled.ul`
  ${ListCSS};
`;

const OrderedList = styled.ol`
  ${ListCSS};
`;

const BlockQuote = styled.blockquote`
  background: rgba(0, 0, 0, 0.025);
  font-weight: 500;
  line-height: 1.75;
  margin: 2em 0;
  padding: 2em;
`;

const Strong = styled.strong`
  font-weight: 700;
`;

const Italic = styled.em`
  font-style: italic;
`;

const TextLink = styled.a`
  position: relative;

  ::after {
    @keyframes hover {
      0% {
        transform: scaleX(1);
        transform-origin: top right;
      }
      50% {
        transform: scaleX(0);
        transform-origin: top right;
      }
      51% {
        transform: scaleX(0);
        transform-origin: top left;
      }
      100% {
        transform: scaleX(1);
        transform-origin: top left;
      }
    }

    background-color: #111111;
    bottom: -0.25em;
    content: "";
    display: block;
    height: 2px;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    transform: scaleX(1);
    transform-origin: top right;
  }

  &:hover {
    ::after {
      animation: hover 0.5s ${(props) => props.theme.easeout} both;
      transform-origin: top left;
    }
  }
`;

const Code = styled.code`
  background-color: rgba(120, 140, 180, 0.25);
  font-family: "IBM Plex Mono", monospace;
  margin: 0 0.25ch;
  padding: 0.25ch 0.75ch;
`;

const Pre = styled(SyntaxHighlighter)`
  font-size: 0.9em;
  line-height: 1.25;
  margin: 2rem 0 2rem -1rem;
  padding: 1rem !important;
  width: calc(100% + 2rem);

  code {
    font-family: "IBM Plex Mono", monospace;
  }
`;

export default function ArticleBlocks({ content }) {
  const serializers = {
    types: {
      block: (props) => {
        const { style = "normal" } = props.node;

        if (style === "h1") {
          return <Heading2>{props.children}</Heading2>;
        }

        if (style === "h2") {
          return <Heading2>{props.children}</Heading2>;
        }

        if (style === "h3") {
          return <Heading3>{props.children}</Heading3>;
        }

        if (style === "h4") {
          return <Heading4>{props.children}</Heading4>;
        }

        if (style === "h5") {
          return <Heading5>{props.children}</Heading5>;
        }

        if (style === "h6") {
          return <Heading6>{props.children}</Heading6>;
        }

        if (style === "normal") {
          return <Paragraph>{props.children}</Paragraph>;
        }

        if (style === "blockquote") {
          return <BlockQuote>{props.children}</BlockQuote>;
        }

        // Fall back to default handling
        return BlockContent.defaultSerializers.types.block(props);
      },
      code: (props) => {
        const { highlightedLines } = props.node;
        return (
          <Pre
            language={props.node.language}
            style={atomOneDarkReasonable}
            showLineNumbers
            lineNumberStyle={{ fontSize: `0rem` }}
            wrapLines
            lineProps={(lineNumber) => {
              let style = { display: `block`, width: "100%" };
              if (
                typeof highlightedLines !== "undefined" &&
                highlightedLines.includes(lineNumber)
              ) {
                style.backgroundColor = "rgba(120, 140, 180, 0.25)";
              }
              return { style };
            }}
          >
            {props.node.code}
          </Pre>
        );
      },
      article_component: (props) => {
        return <ArticleComponent component={props.node.component} />;
      },
    },
    list: (props) =>
      props.type === "bullet" ? (
        <UnorderedList>{props.children}</UnorderedList>
      ) : (
        <OrderedList>{props.children}</OrderedList>
      ),
    listItem: (props) =>
      props.type === "bullet" ? (
        <li>{props.children}</li>
      ) : (
        <li>{props.children}</li>
      ),
    marks: {
      strong: (props) => <Strong>{props.children}</Strong>,
      em: (props) => <Italic>{props.children}</Italic>,
      code: (props) => <Code>{props.children}</Code>,
      link_internal: (props) => (
        <Link
          href={
            props.mark.type === "project"
              ? `/projects/${props.mark.slug === props.mark.slug}`
              : props.mark.type === "article"
              ? `/articles/${props.mark.slug}`
              : `/${props.mark.slug === "homepage" ? "" : props.mark.slug}`
          }
          passHref
          scroll={false}
        >
          <TextLink>{props.children}</TextLink>
        </Link>
      ),
      link_file: (props) => (
        <TextLink
          href={props.mark.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.children}
        </TextLink>
      ),
      link_external: (props) => (
        <TextLink
          href={props.mark.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.children}
        </TextLink>
      ),
    },
  };

  return (
    <Section>
      <SiteGrid>
        <Wrapper>
          <BlockContent blocks={content} serializers={serializers} />
        </Wrapper>
      </SiteGrid>
    </Section>
  );
}
