import React from 'react';

import useParticipants from 'hooks/useParticipants/useParticipants';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import Chat from 'components/AudioOnlyEvent/Chat/Chat';
import AudioParticipant from './AudioParticipant/AudioParticipant';
import { Container, Left, Center, Right } from './styles';
import ConversationGrid from 'components/ConversationGrid/ConversationGrid';
import Hidden from '@material-ui/core/Hidden';

export default function AudioRoom() {
  const {
    room: { localParticipant },
  } = useMediaContext();
  const participants = useParticipants();

  return (
    <Container>
      <Hidden xsDown>
        <Left>
          <ConversationGrid />
        </Left>
      </Hidden>
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
