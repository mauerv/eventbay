import React from 'react';
import { LocalTrackPublication, RemoteTrackPublication, Track } from 'twilio-video';

import useTrack from 'hooks/useTrack/useTrack';
import AudioTrack from 'components/AudioTrack/AudioTrack';
import VideoTrack from 'components/VideoTrack/VideoTrack';

type Props = {
  publication: LocalTrackPublication | RemoteTrackPublication;
  isLocal: boolean;
  disableAudio?: boolean;
  videoPriority?: Track.Priority;
};

export default function Publication({ publication, isLocal, disableAudio, videoPriority }: Props) {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case 'video':
      return (
        <VideoTrack
          track={track}
          priority={videoPriority}
          isLocal={track.name.includes('camera') && isLocal}
        />
      );
    case 'audio':
      return disableAudio ? null : <AudioTrack track={track} />;
    default:
      return null;
  }
}
