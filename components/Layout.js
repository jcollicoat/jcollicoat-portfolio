import styled from "styled-components";

const Main = styled.main`
  background-color: ${(props) => props.theme.background || `#111111`};
  color: ${(props) => props.theme.text || "#ffffff"};
  min-height: 100vh;
  padding: 15rem 0;
  width: 100%;
`;

export default function Layout({ children, theme }) {
  return <Main theme={theme}>{children}</Main>;
}
