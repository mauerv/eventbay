import styled from 'styled-components';
import Masonry from 'react-masonry-css';

export const StyledMasonry = styled(Masonry)`
  display: flex;
  height: calc(var(--vh) * 89);
  overflow: scroll;
  margin-left: ${props => props.theme.spacing(2)}px;
  margin-top: calc(var(--vh) * 2);
  width: auto;
  & .masonry-grid_column {
    padding-left: ${props => props.theme.spacing(2)}px;
    background-clip: padding-box;
  }
  & .masonry-grid_column > div {
    display: flex;
    flex-direction: column;
    margin-bottom: ${props => props.theme.spacing(2)}px;
  }
`;
