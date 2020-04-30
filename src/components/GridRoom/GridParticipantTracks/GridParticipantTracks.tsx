import React from 'react';
import { LocalParticipant, RemoteParticipant, Track } from 'twilio-video';

import GridPublication from '../GridPublication/GridPublication';
import usePublications from 'hooks/usePublications/usePublications';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
  videoPriority?: Track.Priority;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
};

export default function GridParticipantTracks({
  participant,
  disableAudio,
  enableScreenShare,
  videoPriority,
}: Props) {
  const { room } = useVideoContext();
  const publications = usePublications(participant);
  const isLocal = participant === room.localParticipant;

  let filteredPublications;

  if (enableScreenShare && publications.some(p => p.trackName === 'screen')) {
    filteredPublications = publications.filter(p => p.trackName !== 'camera');
  } else {
    filteredPublications = publications.filter(p => p.trackName !== 'screen');
  }

  return (
    <>
      {filteredPublications.map(publication => (
        <GridPublication
          key={publication.kind}
          publication={publication}
          isLocal={isLocal}
          disableAudio={disableAudio}
          videoPriority={videoPriority}
        />
      ))}
    </>
  );
}
