import React from 'react';
import {
  LocalParticipant,
  RemoteParticipant,
  LocalAudioTrack,
  RemoteAudioTrack,
} from 'twilio-video';

import AudioTrack from 'components/AudioTrack/AudioTrack';
import usePublications from 'hooks/usePublications/usePublications';
import useTrack from 'hooks/useTrack/useTrack';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
};

export default function AudioParticipantTracks({ participant }: Props) {
  const publications = usePublications(participant);
  const audioPublication = publications.find(publication => publication.kind === 'audio');
  const track = useTrack(audioPublication) as LocalAudioTrack | RemoteAudioTrack;

  if (!track) return null;

  return <AudioTrack track={track} />;
}
