import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(24, 1fr);
  margin: 0 auto;
  max-width: 1600px;
  padding: 0 ${(props) => props.theme.padding.md};
  position: ${(props) => props.relative && `relative`};
  width: 100%;
`;

export default function SiteGrid({ children, relative }) {
  return <Grid relative={relative}>{children}</Grid>;
}
