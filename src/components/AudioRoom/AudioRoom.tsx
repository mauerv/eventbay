import React from 'react';

import useParticipants from 'hooks/useParticipants/useParticipants';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import Chat from 'components/Chat/Chat';
import Hidden from '@material-ui/core/Hidden';
import ToggleFullScreenButton from 'components/ToggleFullScreenButton/ToggleFullScreenButton';
import AudioParticipant from './AudioParticipant/AudioParticipant';

export default function AudioRoom() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();

  return (
    <div>
      <Hidden smDown>
        <ToggleFullScreenButton />
      </Hidden>
      {[localParticipant, ...participants].map((participant, index) => (
        <AudioParticipant key={participant.sid} participant={participant} />
      ))}
      <Chat />
    </div>
  );
}
