import React from 'react';
import styled from 'styled-components';

import useTrack from 'hooks/useTrack/useTrack';
import useIsParticipantSpeaking from 'hooks/useIsParticipantSpeaking/useIsParticipantSpeaking';
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

const Container = styled.div`
  width: 200px;
  height: 200px;
`;

export default function AudioPublication({ disableAudio, isLocal, publication }: Props) {
  const track = useTrack(publication) as LocalAudioTrack | RemoteAudioTrack;
  const isParticipantSpeaking = useIsParticipantSpeaking(track);

  if (!track) return null;

  let content;

  switch (track.kind) {
    case 'audio':
      content = disableAudio ? null : <AudioTrack track={track} />;
      break;
    default:
      content = null;
  }

  return (
    <Container>
      {isParticipantSpeaking ? 'speaking' : 'silent'}
      {content}
    </Container>
  );
}
