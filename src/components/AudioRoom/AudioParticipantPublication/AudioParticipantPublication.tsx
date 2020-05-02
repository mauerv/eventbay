import React from 'react';

import useTrack from 'hooks/useTrack/useTrack';
import AudioTrack from 'components/AudioTrack/AudioTrack';
import { LocalTrackPublication, RemoteTrackPublication } from 'twilio-video';

type Props = {
  publication: LocalTrackPublication | RemoteTrackPublication;
  isLocal: boolean;
  disableAudio?: boolean;
};

export default function AudioPublication({ disableAudio, isLocal, publication }: Props) {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case 'audio':
      return disableAudio ? null : <AudioTrack track={track} />;
    default:
      return null;
  }
}
