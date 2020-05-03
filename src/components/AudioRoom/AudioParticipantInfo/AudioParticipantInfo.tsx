import React, { ReactNode } from 'react';
import { RemoteParticipant, LocalParticipant, AudioTrack } from 'twilio-video';

import usePublications from 'hooks/usePublications/usePublications';
import useTrack from 'hooks/useTrack/useTrack';
import useIsParticipantSpeaking from 'hooks/useIsParticipantSpeaking/useIsParticipantSpeaking';

type Props = {
  participant: RemoteParticipant | LocalParticipant;
  children: ReactNode;
};

export default function AudioParticipantInfo({ children, participant }: Props) {
  const publications = usePublications(participant);
  const audioPublication = publications.find(publication => publication.kind === 'audio');
  const track = useTrack(audioPublication) as AudioTrack;
  const isParticipantSpeaking = useIsParticipantSpeaking(track);

  return (
    <div>
      <p>{participant.identity}</p>
      <p>{isParticipantSpeaking ? 'speaking' : 'silent'}</p>
      {children}
    </div>
  );
}
