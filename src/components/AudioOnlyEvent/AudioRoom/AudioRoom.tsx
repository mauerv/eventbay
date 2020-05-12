import React from 'react';

import useParticipants from 'hooks/useParticipants/useParticipants';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import Chat from 'components/AudioOnlyEvent/Chat/Chat';
import AudioParticipant from './AudioParticipant/AudioParticipant';
import { Container, Column } from './styles';
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
        <Column>
          <ConversationGrid />
        </Column>
      </Hidden>
      <Column>
        {[localParticipant, ...participants].map(participant => (
          <AudioParticipant key={participant.sid} participant={participant} />
        ))}
      </Column>
      <Hidden mdDown>
        <Column>
          <Chat />
        </Column>
      </Hidden>
    </Container>
  );
}
