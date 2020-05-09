import styled from 'styled-components';

export const Main = styled.main`
  height: calc(var(--vh) * 100);
  width: 100%;
  position: relative;
  @media (min-width: 960px) {
    left: 240px;
    width: calc(100% - 240px);
  }
`;
