import React from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import usePublications from 'hooks/usePublications/usePublications';
import Publication from 'components/Publication/Publication';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
};

export default function AudioParticipantTrack({ participant }: Props) {
  const { room } = useVideoContext();
  const isLocal = participant === room.localParticipant;
  const publications = usePublications(participant);
  const audioPublication = publications.find(publication => publication.kind !== 'audio');

  if (!audioPublication) return null;

  return <Publication isLocal={isLocal} publication={audioPublication} />;
}
