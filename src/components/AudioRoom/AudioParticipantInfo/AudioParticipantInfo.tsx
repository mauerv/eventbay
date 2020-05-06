import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant, AudioTrack } from 'twilio-video';

import usePublicationIsTrackEnabled from 'hooks/usePublicationIsTrackEnabled/usePublicationIsTrackEnabled';
import usePublications from 'hooks/usePublications/usePublications';
import useTrack from 'hooks/useTrack/useTrack';
import useIsParticipantSpeaking from 'hooks/useIsParticipantSpeaking/useIsParticipantSpeaking';
import PersonIcon from '@material-ui/icons/Person';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Container, LeftContent, RightContent, Name } from './styles';
import MicOff from '@material-ui/icons/MicOff';

type Props = {
  participant: RemoteParticipant | LocalParticipant;
  children: ReactNode;
};

export default function AudioParticipantInfo({ children, participant }: Props) {
  const publications = usePublications(participant);
  const audioPublication = publications.find(publication => publication.kind === 'audio');
  const isAudioEnabled = usePublicationIsTrackEnabled(audioPublication);
  const track = useTrack(audioPublication) as AudioTrack;
  const isParticipantSpeaking = useIsParticipantSpeaking(track);

  let content = null;
  if (!isAudioEnabled) {
    content = <MicOff fontSize="large" />;
  } else if (isParticipantSpeaking) {
    content = <VolumeUpIcon fontSize="large" />;
  }

  return (
    <Container>
      <LeftContent>
        <PersonIcon fontSize="large" />
        <Name>{participant.identity}</Name>
      </LeftContent>
      <RightContent>{content}</RightContent>
      {children}
    </Container>
  );
}
