import styled from "styled-components";

import SiteGrid from "../SiteGrid";

const Section = styled.section`
  margin: 10rem 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.05em;
  margin-bottom: 2em;
`;

const Column = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 5rem;

  @media (min-width: 1200px) {
    grid-column: span 12;
    margin-bottom: 0;
  }
`;

const List = styled.div`
  margin-left: 2rem;
  position: relative;
`;

const ListLine = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.25) calc(100% - 4rem),
    rgba(255, 255, 255, 0)
  );
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  width: 2px;
`;

const Item = styled.div`
  padding: 0 2rem 4rem 2rem;
  position: relative;
`;

const Dot = styled.div`
  background-color: #111111;
  border: 2px solid #ffffff;
  border-radius: 0.75rem;
  height: 1.25rem;
  left: calc(-0.625rem + 1px);
  position: absolute;
  top: 0;
  width: 1.25rem;
  z-index: 1;
`;

const Heading = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.25rem;
  margin-bottom: 0.75rem;
`;

const Details = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  opacity: 0.5;
  text-transform: uppercase;
`;

const Type = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  color: #111111;
  margin-right: 1em;
  padding: 0.25em 0.5em;
`;

const Date = styled.div`
  margin-top: 0.5em;
`;

const Description = styled.p`
  line-height: 1.75;
`;

export default function AboutMe({ data }) {
  return (
    <Section>
      <SiteGrid>
        <Column>
          <Title>Experience</Title>
          <List>
            {data.experience.map((item, index) => {
              return (
                <Item key={index}>
                  <Dot />
                  <Heading>
                    {item._type === "role" ? item.company : item.client}
                  </Heading>
                  <Details>
                    <Type>
                      {item._type === "role" ? "Full-time Role" : "Freelance"}
                    </Type>
                    <Date>{item.time_period}</Date>
                  </Details>
                  <Description>{item.description}</Description>
                </Item>
              );
            })}
            <ListLine />
          </List>
        </Column>
        <Column>
          <Title>Education</Title>
          <List>
            {data.education.map((item, index) => {
              return (
                <Item key={index}>
                  <Dot />
                  <Heading>{item.name}</Heading>
                  <Details>
                    <Type>{item.location}</Type>
                    <Date>{item.time_period}</Date>
                  </Details>
                  <Description>{item.description}</Description>
                </Item>
              );
            })}
            <ListLine />
          </List>
        </Column>
      </SiteGrid>
    </Section>
  );
}
