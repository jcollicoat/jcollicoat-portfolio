import styled from "styled-components";
import { motion } from "framer-motion";

import useFadeIn from "../../hooks/useFadeIn";

import Article from "../Article";

const Section = styled(motion.section)`
  margin: 10rem 0;
`;

export default function ArticlesList({ data }) {
  const articles = data.articles_list;

  // Section animation
  const {
    ref: sectionRef,
    ctrls: sectionCtrls,
    vars: sectionVars,
  } = useFadeIn({
    delay: 1,
    threshold: 0.01,
  });

  const ArticlesMap = articles.map((article, index) => {
    return <Article article={article} key={index} />;
  });

  return (
    <Section
      ref={sectionRef}
      initial="hidden"
      animate={sectionCtrls}
      variants={sectionVars}
    >
      {ArticlesMap}
    </Section>
  );
}
