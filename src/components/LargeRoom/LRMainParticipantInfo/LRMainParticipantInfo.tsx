import React, { ReactNode } from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import BandwidthWarning from 'components/BandwidthWarning/BandwidthWarning';
import useIsTrackSwitchedOff from 'hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublications from 'hooks/usePublications/usePublications';
import useTrack from 'hooks/useTrack/useTrack';
import { TrackType } from 'types';

import { Container, MainInfo, DisplayName, StyledVideocamOff } from './styles';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
  children: ReactNode;
};

export default function MainParticipantInfo({ participant, children }: Props) {
  const publications = usePublications(participant);
  const videoPublication = publications.find(p => p.trackName === 'camera');
  const screenSharePublication = publications.find(p => p.trackName === 'screen');
  const isVideoEnabled = Boolean(videoPublication);

  const videoTrack = useTrack(screenSharePublication || videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack as TrackType);

  return (
    <Container isVideoEnabled={isVideoEnabled} isVideoSwitchedOff={isVideoSwitchedOff}>
      <MainInfo>
        <DisplayName>
          {participant.identity}
          {!isVideoEnabled && <StyledVideocamOff />}
        </DisplayName>
      </MainInfo>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </Container>
  );
}
