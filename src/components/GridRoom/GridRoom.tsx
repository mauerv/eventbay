import React, { useMemo } from 'react';

import Chat from 'components/Chat/Chat';
import Hidden from '@material-ui/core/Hidden';
import ToggleFullScreenButton from 'components/ToggleFullScreenButton/ToggleFullScreenButton';
import EmptyRoomInfo from 'components/EmptyRoomInfo/EmptyRoomInfo';
import GridParticipant from './GridParticipant/GridParticipant';
import useParticipants from 'hooks/useParticipants/useParticipants';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import { Container } from './styles';

export default function GridRoom() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();

  const gridSize = useMemo(() => {
    return participants.length + 1;
  }, [participants]);

  return (
    <Container gridSize={gridSize}>
      <Hidden smDown>
        <ToggleFullScreenButton gridSize={gridSize} />
      </Hidden>
      {[localParticipant, ...participants].map((participant, index) => (
        <GridParticipant
          key={participant.sid}
          participant={participant}
          gridPosition={index}
          gridSize={gridSize}
        />
      ))}
      <EmptyRoomInfo show={gridSize === 1} />
      <Chat />
    </Container>
  );
}
