import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant, AudioTrack } from 'twilio-video';
import styled from 'styled-components';

import usePublications from 'hooks/usePublications/usePublications';
import useTrack from 'hooks/useTrack/useTrack';
import useIsParticipantSpeaking from 'hooks/useIsParticipantSpeaking/useIsParticipantSpeaking';
import PersonIcon from '@material-ui/icons/Person';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Typography from '@material-ui/core/Typography';

type Props = {
  participant: RemoteParticipant | LocalParticipant;
  children: ReactNode;
};

const Container = styled.div`
  display: flex;
  left: 56px;
  width: 300px;
  height: 56px;
  border-radius: 5px;
  margin: ${props => props.theme.spacing(1)}px auto;
  justify-content: space-between;
  background-color: ${props => props.theme.palette.secondary.main};
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled(Typography)`
  margin-left: ${props => props.theme.spacing(1)}px;
`;

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
