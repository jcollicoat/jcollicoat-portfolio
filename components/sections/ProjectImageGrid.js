import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

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

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-column: 1 / -1;
  justify-content: center;
`;

const Item = styled(motion.div)`
  padding: ${(props) => props.theme.padding.sm};
  //text-align: center;
  width: calc(100% / ${(props) => props.columns});

  @media (min-width: 800px) {
    padding: ${(props) => props.theme.padding.md};
  }

  @media (min-width: 1200px) {
    padding: ${(props) => props.theme.padding.lg};
  }
`;

const ImageContainer = styled.div`
  height: auto;
  margin-bottom: ${(props) => props.theme.padding.md};
  width: 100%;
`;

const ItemName = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5em;
`;

const ItemCopy = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.5;
`;

export default function ProjectImageGrid({ data }) {
  // Copy animation
  const {
    ref: copyRef,
    ctrls: copyCtrls,
    vars: copyVars,
  } = useAnimateIn({
    threshold: 0.5,
  });

  // Item animation
  const {
    ref: itemRef,
    ctrls: itemCtrls,
    vars: itemVars,
  } = useAnimateIn({
    threshold: 0.25,
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
          <CopyHeading>{data.copy_heading}</CopyHeading>
          <CopyParagraph>{data.copy}</CopyParagraph>
        </Copy>
        <Items>
          {data.items.map((item, index) => (
            <Item
              columns={data.columns}
              key={index}
              ref={itemRef}
              initial="hidden"
              animate={itemCtrls}
              variants={itemVars}
            >
              <ImageContainer>
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
              </ImageContainer>
              {item.include_name && <ItemName>{item.name}</ItemName>}
              {item.include_copy && <ItemCopy>{item.copy}</ItemCopy>}
            </Item>
          ))}
        </Items>
      </SiteGrid>
    </Section>
  );
}
