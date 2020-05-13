import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  height: calc(var(--vh) * 92);
`;

export const Left = styled.div`
  ${props => props.theme.breakpoints.up('sm')} {
    width: 50%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 33%;
  }
`;

export const Center = styled.div`
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 50%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 33%;
  }
`;

export const Right = styled.div`
  ${props => props.theme.breakpoints.up('md')} {
    width: 33%;
  }
`;
