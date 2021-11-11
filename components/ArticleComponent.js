import { useReducer } from "react";
import styled from "styled-components";

// Components
import AnimatingTextFramerOne from "./articles/AnimatingTextFramerOne";
import AnimatingTextFramerTwo from "./articles/AnimatingTextFramerTwo";

const Wrapper = styled.div`
  margin: 3rem 0 5rem 0;
  position: relative;
  width: 100%;
`;

const ComponentWrapper = styled.div`
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  min-height: 20rem;
  padding: 4rem 2rem;
  width: 100%;
`;

const ReloadButton = styled.button`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  display: flex;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  position: absolute;
  right: 0;
  text-transform: uppercase;
`;

const ReloadButtonIcon = styled.svg`
  height: 1rem;
  margin-left: 0.5rem;
  width: 1rem;
`;

export default function ArticleComponent({ component }) {
  const [_, reloadComponent] = useReducer((x) => x + 1, 0);

  const Component = () => {
    switch (component) {
      case "AnimatingTextFramerOne":
        return <AnimatingTextFramerOne key={_} />;
      case "AnimatingTextFramerTwo":
        return <AnimatingTextFramerTwo key={_} />;
    }
  };

  return (
    <Wrapper>
      <ComponentWrapper>{Component()}</ComponentWrapper>
      <ReloadButton onClick={reloadComponent}>
        Reload
        <ReloadButtonIcon
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </ReloadButtonIcon>
      </ReloadButton>
    </Wrapper>
  );
}
