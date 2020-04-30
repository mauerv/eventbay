import MainParticipantInfo from 'components/MainParticipantInfo/MainParticipantInfo';
import ParticipantTracks from 'components/ParticipantTracks/ParticipantTracks';
import React from 'react';
import useMainSpeaker from 'hooks/useMainSpeaker/useMainSpeaker';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

export default function MainParticipant() {
  const mainParticipant = useMainSpeaker() as LocalParticipant | RemoteParticipant;
  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        disableAudio
        enableScreenShare
        videoPriority="high"
      />
    </MainParticipantInfo>
  );
}
