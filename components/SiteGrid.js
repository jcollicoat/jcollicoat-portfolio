import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-column-gap: 0.5rem;
  grid-template-columns: repeat(24, 1fr);
  margin: 0 auto;
  margin-left: ${(props) => props.overflow === "left" && "0"};
  margin-right: ${(props) => props.overflow === "right" && "0"};
  max-width: ${(props) => {
    if (props.overflow === "right") {
      return "calc(100% - ((100% - 1600px) / 2))";
    } else if (props.overflow === "left") {
      return "calc(100% - ((100% - 1600px) / 2))";
    }
    return "1600px";
  }};
  padding: 0 ${(props) => props.theme.padding.md};
  padding-left: ${(props) => props.overflow === "left" && "0"};
  padding-right: ${(props) => props.overflow === "right" && "0"};
  position: ${(props) => props.relative && `relative`};
  width: 100%;
`;

export default function SiteGrid({ children, overflow, relative }) {
  return (
    <Grid overflow={overflow} relative={relative}>
      {children}
    </Grid>
  );
}
