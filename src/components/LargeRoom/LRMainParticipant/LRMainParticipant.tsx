import React from 'react';

import LRMainParticipantInfo from '../LRMainParticipantInfo/LRMainParticipantInfo';
import LRParticipantTracks from '../LRParticipantTracks/LRParticipantTracks';
import useMainSpeaker from 'hooks/useMainSpeaker/useMainSpeaker';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

export default function MainParticipant() {
  const mainParticipant = useMainSpeaker() as LocalParticipant | RemoteParticipant;
  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <LRMainParticipantInfo participant={mainParticipant}>
      <LRParticipantTracks
        participant={mainParticipant}
        disableAudio
        enableScreenShare
        videoPriority="high"
      />
    </LRMainParticipantInfo>
  );
}
