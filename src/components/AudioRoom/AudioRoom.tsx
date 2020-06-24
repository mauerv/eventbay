import React from 'react';

import useParticipants from 'hooks/useParticipants/useParticipants';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import Chat from 'components/Chat/Chat';
import AudioParticipant from './AudioParticipant/AudioParticipant';
import { Container } from './styles';

export default function AudioRoom() {
  const {
    room: { localParticipant },
  } = useMediaContext();
  const participants = useParticipants();

  return (
    <Container>
      {[localParticipant, ...participants].map(participant => (
        <AudioParticipant key={participant.sid} participant={participant} />
      ))}
      <Chat />
    </Container>
  );
}
