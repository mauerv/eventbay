import React from 'react';
import { LocalParticipant, RemoteParticipant, Track } from 'twilio-video';

import AudioParticipantPublication from '../AudioParticipantPublication/AudioParticipantPublication';
import usePublications from 'hooks/usePublications/usePublications';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
};

export default function AudioParticipantTracks({ participant, disableAudio }: Props) {
  const { room } = useVideoContext();
  const publications = usePublications(participant);
  const isLocal = participant === room.localParticipant;

  return (
    <>
      {publications.map(publication => (
        <AudioParticipantPublication
          key={publication.kind}
          publication={publication}
          isLocal={isLocal}
          disableAudio={disableAudio}
        />
      ))}
    </>
  );
}
