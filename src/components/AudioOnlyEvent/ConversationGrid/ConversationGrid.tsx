import React from 'react';

import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import fakedata from './fakedata.json';
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
      {fakedata.rooms &&
        fakedata.rooms.map((roomItem: any) => (
          <div>
            <p>{roomItem.uniqueName}</p>
            {roomItem.participants.map((participant: any) => (
              <p>{participant.identity}</p>
            ))}
          </div>
        ))}
    </StyledMasonry>
  );
}
