import React, { ReactNode } from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import usePublications from 'hooks/usePublications/usePublications';

import { Container, MainInfo, DisplayName, StyledVideocamOff } from './styles';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
  children: ReactNode;
};

export default function MainParticipantInfo({ participant, children }: Props) {
  const publications = usePublications(participant);
  const videoPublication = publications.find(p => p.trackName === 'camera');
  const isVideoEnabled = Boolean(videoPublication);

  return (
    <Container isVideoEnabled={isVideoEnabled}>
      <MainInfo>
        <DisplayName>
          {participant.identity}
          {!isVideoEnabled && <StyledVideocamOff />}
        </DisplayName>
      </MainInfo>
      {children}
    </Container>
  );
}
