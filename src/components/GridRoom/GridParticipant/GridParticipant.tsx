import React, { useMemo } from 'react';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import GridParticipantInfo from '../GridParticipantInfo/GridParticipantInfo';
import GridParticipantTracks from '../GridParticipantTracks/GridParticipantTracks';

type Props = {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  gridSize: number;
  gridPosition: number;
};

export default function Participant({
  participant,
  gridSize,
  gridPosition,
  disableAudio,
  enableScreenShare,
}: Props) {
  const fullWidth = useMemo(() => {
    if (gridSize <= 2 || (gridSize === 3 && gridPosition === 2)) {
      return true;
    } else return false;
  }, [gridSize, gridPosition]);

  return (
    <GridParticipantInfo
      participant={participant}
      fullWidth={fullWidth}
      gridPosition={gridPosition}
    >
      <GridParticipantTracks
        participant={participant}
        disableAudio={disableAudio}
        enableScreenShare={enableScreenShare}
      />
    </GridParticipantInfo>
  );
}
