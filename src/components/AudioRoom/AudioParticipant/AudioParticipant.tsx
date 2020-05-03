import React from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import AudioParticipantPublication from '../AudioParticipantPublication/AudioParticipantPublication';
import AudioParticipantInfo from '../AudioParticipantInfo/AudioParticipantInfo';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
};

export default function AudioParticipant({ participant }: Props) {
  return (
    <AudioParticipantInfo participant={participant}>
      <AudioParticipantPublication participant={participant} />
    </AudioParticipantInfo>
  );
}
