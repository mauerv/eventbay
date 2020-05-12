import React from 'react';

import useParticipants from 'hooks/useParticipants/useParticipants';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import Chat from 'components/AudioOnlyEvent/Chat/Chat';
import AudioParticipant from './AudioParticipant/AudioParticipant';
import { Container, Left, Center, Right } from './styles';

export default function AudioRoom() {
  const {
    room: { localParticipant },
  } = useMediaContext();
  const participants = useParticipants();

  return (
    <Container>
      <Left></Left>
      <Center>
        {[localParticipant, ...participants].map(participant => (
          <AudioParticipant key={participant.sid} participant={participant} />
        ))}
      </Center>
      <Right>
        <Chat />
      </Right>
    </Container>
  );
}
