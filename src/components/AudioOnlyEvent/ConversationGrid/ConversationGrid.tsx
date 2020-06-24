import React from 'react';

import ConversationGridItem from './ConversationGridItem/ConversationGridItem';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import { StyledMasonry } from './styles';

const breakpointCols = {
  400: 1,
  600: 2,
  1280: 3,
  default: 4,
};

export default function ConversationGrid() {
  const { roomsState } = useRooms();

  return (
    <StyledMasonry
      breakpointCols={breakpointCols}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {roomsState.rooms &&
        roomsState.rooms.map((roomItem: any) => <ConversationGridItem room={roomItem} />)}
    </StyledMasonry>
  );
}
