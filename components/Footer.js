import styled from "styled-components";

import ContactForm from "./ContactForm";

import SiteGrid from "./SiteGrid";

const Wrapper = styled.footer`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100vh;
  padding: ${(props) => props.theme.padding.lg} 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  grid-column: 1 / -1;
  margin-top: ${(props) => props.theme.padding.lg};
  text-align: center;
  text-transform: uppercase;

  @media (min-width: 800px) {
    flex-direction: row;
    grid-column: 2 / -2;
    justify-content: flex-end;
  }
`;

const Item = styled.a`
  margin: ${(props) => props.theme.padding.md} 0;
  position: relative;

  @media (min-width: 800px) {
    margin: 0 0 0 ${(props) => props.theme.padding.lg};

    ::after {
      background-color: #ffffff;
      content: "";
      display: block;
      height: 2px;
      left: 0;
      position: absolute;
      right: 0;
      transform: scaleX(0);
      transform-origin: top right;
      transition: transform 0.25s ${(props) => props.theme.easeout};
    }

    &:hover {
      ::after {
        transform: scaleX(1);
        transform-origin: top left;
      }
    }
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <ContactForm />
      <SiteGrid>
        <List>
          <Item href="#">Resumé / CV</Item>
          <Item
            href="https://github.com/jcollicoat"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </Item>
          <Item
            href="https://www.linkedin.com/in/josephcollicoat/"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </Item>
        </List>
      </SiteGrid>
    </Wrapper>
  );
}
