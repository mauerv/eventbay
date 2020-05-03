import React from 'react';
import styled from 'styled-components';

import useIsParticipantSpeaking from 'hooks/useIsParticipantSpeaking/useIsParticipantSpeaking';
import useTrack from 'hooks/useTrack/useTrack';
import AudioTrack from 'components/AudioTrack/AudioTrack';
import {
  LocalTrackPublication,
  RemoteTrackPublication,
  LocalAudioTrack,
  RemoteAudioTrack,
} from 'twilio-video';

type Props = {
  publication: LocalTrackPublication | RemoteTrackPublication;
  isLocal: boolean;
  disableAudio?: boolean;
};

type ContainerProps = {
  isSpeaking: boolean;
};

const Container = styled.div<ContainerProps>`
  background-color: ${props => (props.isSpeaking ? 'red' : 'green')};
  width: 200px;
  height: 200px;
`;

export default function AudioPublication({ disableAudio, isLocal, publication }: Props) {
  const track = useTrack(publication) as LocalAudioTrack | RemoteAudioTrack;
  const isSpeaking = useIsParticipantSpeaking(track);

  if (!track) return null;

  let content;

  switch (track.kind) {
    case 'audio':
      content = disableAudio ? null : <AudioTrack track={track} />;
      break;
    default:
      content = null;
  }

  return <Container isSpeaking={isSpeaking}>{content}</Container>;
}
