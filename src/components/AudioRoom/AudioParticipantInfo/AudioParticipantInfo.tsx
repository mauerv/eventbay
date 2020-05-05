import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant, AudioTrack } from 'twilio-video';

import usePublications from 'hooks/usePublications/usePublications';
import useTrack from 'hooks/useTrack/useTrack';
import useIsParticipantSpeaking from 'hooks/useIsParticipantSpeaking/useIsParticipantSpeaking';
import PersonIcon from '@material-ui/icons/Person';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Container, LeftContent, RightContent, Name } from './styles';

type Props = {
  participant: RemoteParticipant | LocalParticipant;
  children: ReactNode;
};

export default function AudioParticipantInfo({ children, participant }: Props) {
  const publications = usePublications(participant);
  const audioPublication = publications.find(publication => publication.kind === 'audio');
  const track = useTrack(audioPublication) as AudioTrack;
  const isParticipantSpeaking = useIsParticipantSpeaking(track);

  return (
    <Container>
      <LeftContent>
        <PersonIcon fontSize="large" />
        <Name>{participant.identity}</Name>
      </LeftContent>
      <RightContent>{isParticipantSpeaking && <VolumeUpIcon fontSize="large" />}</RightContent>
      {children}
    </Container>
  );
}
