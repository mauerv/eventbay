import styled from 'styled-components';

type ContainerProps = {
  gridSize: Number;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${props => (props.gridSize > 2 ? 'row' : 'column')};
  flex-wrap: ${props => (props.gridSize > 2 ? 'wrap' : 'nowrap')};
  padding: 0;
  margin: 0;
  height: calc(var(--vh) * 100);
`;
