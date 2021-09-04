import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;
  margin: 0 auto;
  max-width: 1600px;
  padding: 0 ${(props) => props.theme.padding.md};
  position: ${(props) => props.relative && `relative`};
  width: 100%;

  @media (min-width: 800px) {
    grid-column-gap: 0.75rem;
    grid-template-columns: repeat(16, 1fr);
  }

  @media (min-width: 1200px) {
    grid-column-gap: 1rem;
    grid-template-columns: repeat(20, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(24, 1fr);
  }
`;

export default function SiteGrid({ children, relative }) {
  return <Grid relative={relative}>{children}</Grid>;
}
