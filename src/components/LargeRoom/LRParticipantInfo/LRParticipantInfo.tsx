import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant } from 'twilio-video';

import ParticipantConnectionIndicator from './ParticipantConnectionIndicator/ParticipantConnectionIndicator';
import PinIcon from './PinIcon/PinIcon';
import ScreenShare from '@material-ui/icons/ScreenShare';
import { Callback } from 'types';
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
import usePublicationIsTrackEnabled from 'hooks/usePublicationIsTrackEnabled/usePublicationIsTrackEnabled';

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

  return (
    <Container onClick={onClick} isVideoEnabled={isVideoEnabled}>
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
      {children}
    </Container>
  );
}
