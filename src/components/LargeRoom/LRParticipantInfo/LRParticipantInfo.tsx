import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant } from 'twilio-video';
import BandwidthWarning from 'components/BandwidthWarning/BandwidthWarning';
import ParticipantConnectionIndicator from './ParticipantConnectionIndicator/ParticipantConnectionIndicator';
import PinIcon from './PinIcon/PinIcon';
import ScreenShare from '@material-ui/icons/ScreenShare';
import {
  Container,
  MainInfo,
  DisplayName,
  MediaInfo,
  OtherInfo,
  StyledMicOff,
  StyledVideocamOff,
} from './styles';

import usePublications from 'hooks/usePublications/usePublications';
import useIsTrackSwitchedOff from 'hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublicationIsTrackEnabled from 'hooks/usePublicationIsTrackEnabled/usePublicationIsTrackEnabled';
import useTrack from 'hooks/useTrack/useTrack';
import { TrackType, Callback } from 'types';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
  onClick: Callback;
  isSelected: boolean;
  children: ReactNode;
};

export default function ParticipantInfo({ participant, onClick, isSelected, children }: Props) {
  const publications = usePublications(participant);

  const audioPublication = publications.find(p => p.kind === 'audio');
  const videoPublication = publications.find(p => p.trackName === 'camera');

  const isAudioEnabled = usePublicationIsTrackEnabled(audioPublication);
  const isVideoEnabled = Boolean(videoPublication);
  const isScreenShareEnabled = publications.find(p => p.trackName === 'screen');

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack as TrackType);

  return (
    <Container
      onClick={onClick}
      isVideoEnabled={isVideoEnabled}
      isVideoSwitchedOff={isVideoSwitchedOff}
    >
      <div>
        <MainInfo>
          <DisplayName>
            <ParticipantConnectionIndicator participant={participant} />
            {participant.identity}
          </DisplayName>
        </MainInfo>
        <MediaInfo>
          {!isAudioEnabled && <StyledMicOff data-cy-audio-mute-icon />}
          {!isVideoEnabled && <StyledVideocamOff />}
          {isScreenShareEnabled && <ScreenShare />}
        </MediaInfo>
        <OtherInfo>{isSelected && <PinIcon />}</OtherInfo>
      </div>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </Container>
  );
}
