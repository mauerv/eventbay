import React from 'react';
import { LocalVideoTrack, LocalAudioTrack } from 'twilio-video';
import { FormattedMessage } from 'react-intl';

import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import useIsSpeaking from 'hooks/useIsSpeaking/useIsSpeaking';
import ToggleSettings from 'components/ToggleSettings/ToggleSettings';

import {
  Container,
  Title,
  Subtitle,
  Video,
  NoVideo,
  Description,
  VideoContainer,
  Settings,
} from './styles';

export default function LocalVideoPreview() {
  const { localTracks } = useVideoContext();
  const videoTrack = localTracks.find(track => track.name === 'camera') as LocalVideoTrack;
  const audioTrack = localTracks.find(track => track.kind === 'audio') as LocalAudioTrack;
  const isSpeaking = useIsSpeaking(audioTrack);

  return (
    <Container>
      <Title>
        <p>{isSpeaking ? 'Speaking' : 'Not Speaking'}</p>
        <FormattedMessage id="preview.title" defaultMessage="Video Preview" />
      </Title>
      <Subtitle>
        <FormattedMessage id="preview.subtitle" defaultMessage="Only you can see this" />
      </Subtitle>
      <VideoContainer>
        <Settings>
          <ToggleSettings />
        </Settings>
        {videoTrack ? <Video track={videoTrack} isLocal /> : <NoVideo />}
      </VideoContainer>
      <Description>
        <FormattedMessage
          id="preview.description"
          defaultMessage="Make sure everything is working and when you're ready join any of the rooms in the sidebar, or feel free to create your own."
        />
      </Description>
    </Container>
  );
}
