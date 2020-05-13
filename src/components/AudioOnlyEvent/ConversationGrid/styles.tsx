import styled from 'styled-components';
import Masonry from 'react-masonry-css';

export const StyledMasonry = styled(Masonry)`
  display: flex;
  height: calc(var(--vh) * 92);
  overflow: scroll;
  margin-left: -30px; /* gutter size offset */
  width: auto;
  & .masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }
  & .masonry-grid_column > div {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
  }
`;
