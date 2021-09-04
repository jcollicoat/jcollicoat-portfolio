import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;
  margin: 0 auto;
  max-width: 1600px;
  padding: 0 1rem;
  width: 100%;

  @media (min-width: 800px) {
    grid-gap: 0.75rem;
    grid-template-columns: repeat(16, 1fr);
    padding: 0 1.5rem;
  }

  @media (min-width: 1200px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(20, 1fr);
    padding: 0 2rem;
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(24, 1fr);
    padding: 0 3rem;
  }
`;

export default function SiteGrid({ children }) {
  return <Grid>{children}</Grid>;
}
