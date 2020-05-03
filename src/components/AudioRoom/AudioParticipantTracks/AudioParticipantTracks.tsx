import React from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

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
  const audioPublication = publications.find(publication => publication.kind === 'audio');

  const isLocal = participant === room.localParticipant;

  return (
    <>
      {audioPublication ? (
        <AudioParticipantPublication
          publication={audioPublication}
          isLocal={isLocal}
          disableAudio={disableAudio}
        />
      ) : null}
    </>
  );
}
