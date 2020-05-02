import React from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import AudioParticipantTracks from '../AudioParticipantTracks/AudioParticipantTracks';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
};

export default function AudioParticipant({ participant, disableAudio }: Props) {
  return (
    <>
      <h2>{participant.identity}</h2>
      <AudioParticipantTracks participant={participant} disableAudio={disableAudio} />
    </>
  );
}
