import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant, AudioTrack } from 'twilio-video';

import usePublicationIsTrackEnabled from 'hooks/usePublicationIsTrackEnabled/usePublicationIsTrackEnabled';
import usePublications from 'hooks/usePublications/usePublications';
import useTrack from 'hooks/useTrack/useTrack';
import useIsParticipantSpeaking from 'hooks/useIsParticipantSpeaking/useIsParticipantSpeaking';
import {
  Container,
  LeftContent,
  RightContent,
  Name,
  StyledVolumeUpIcon,
  StyledMicOff,
  StyledPersonIcon,
} from './styles';

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
    content = <StyledMicOff fontSize="large" />;
  } else if (isParticipantSpeaking) {
    content = <StyledVolumeUpIcon fontSize="large" />;
  }

  return (
    <Container>
      <LeftContent>
        <StyledPersonIcon fontSize="large" />
        <Name>{participant.identity}</Name>
      </LeftContent>
      <RightContent>{content}</RightContent>
      {children}
    </Container>
  );
}
