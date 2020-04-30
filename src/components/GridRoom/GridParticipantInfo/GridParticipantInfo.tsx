import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant } from 'twilio-video';

import BandwidthWarning from 'components/BandwidthWarning/BandwidthWarning';
import NetworkQualityLevel from 'components/NewtorkQualityLevel/NetworkQualityLevel';
import ParticipantConnectionIndicator from './ParticipantConnectionIndicator/ParticipantConnectionIndicator';
import {
  Container,
  OtherInfo,
  NetworkInfo,
  DisplayName,
  StyledMicOff,
  StyledVideocamOff,
} from './styles';

import useParticipantNetworkQualityLevel from 'hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel';
import usePublications from 'hooks/usePublications/usePublications';
import useIsTrackSwitchedOff from 'hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublicationIsTrackEnabled from 'hooks/usePublicationIsTrackEnabled/usePublicationIsTrackEnabled';
import useTrack from 'hooks/useTrack/useTrack';
import { TrackType } from 'types';

type Props = {
  participant: RemoteParticipant | LocalParticipant;
  children: ReactNode;
  gridPosition: number;
  fullWidth: boolean;
};

export default function ParticipantInfo({ participant, children, gridPosition, fullWidth }: Props) {
  const publications = usePublications(participant);

  const audioPublication = publications.find(p => p.kind === 'audio');
  const videoPublication = publications.find(p => p.trackName === 'camera');

  const networkQualityLevel = useParticipantNetworkQualityLevel(participant);
  const isAudioEnabled = usePublicationIsTrackEnabled(audioPublication);
  const isVideoEnabled = Boolean(videoPublication);

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack as TrackType);

  return (
    <Container
      fullWidth={fullWidth}
      isVideoSwitchedOff={isVideoSwitchedOff}
      isVideoEnabled={isVideoEnabled}
    >
      <div>
        <NetworkInfo>
          <DisplayName>
            <ParticipantConnectionIndicator participant={participant} />
            {participant.identity}
          </DisplayName>
          <NetworkQualityLevel qualityLevel={networkQualityLevel} />
        </NetworkInfo>
        <OtherInfo>
          {!isAudioEnabled && <StyledMicOff data-cy-audio-mute-icon fontSize="large" />}
          {!isVideoEnabled && <StyledVideocamOff fontSize="large" />}
        </OtherInfo>
      </div>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </Container>
  );
}
