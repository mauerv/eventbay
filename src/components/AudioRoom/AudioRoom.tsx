import React from 'react';

import useParticipants from 'hooks/useParticipants/useParticipants';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import Chat from 'components/Chat/Chat';
import Hidden from '@material-ui/core/Hidden';
import ToggleFullScreenButton from 'components/ToggleFullScreenButton/ToggleFullScreenButton';
import AudioParticipant from './AudioParticipant/AudioParticipant';
import { Container } from './styles';

export default function AudioRoom() {
  const {
    room: { localParticipant },
  } = useMediaContext();
  const participants = useParticipants();

  return (
    <Container>
      <Hidden smDown>
        <ToggleFullScreenButton />
      </Hidden>
      {[localParticipant, ...participants].map(participant => (
        <AudioParticipant key={participant.sid} participant={participant} />
      ))}
      <Chat />
    </Container>
  );
}
