import React from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import AudioParticipantTrack from '../AudioParticipantTrack/AudioParticipantTrack';
import AudioParticipantInfo from '../AudioParticipantInfo/AudioParticipantInfo';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
};

export default function AudioParticipant({ participant }: Props) {
  return (
    <AudioParticipantInfo participant={participant}>
      <AudioParticipantTrack participant={participant} />
    </AudioParticipantInfo>
  );
}
