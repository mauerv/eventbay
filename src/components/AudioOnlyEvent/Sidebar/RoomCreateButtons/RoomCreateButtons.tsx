import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../styles';
import useCreateRoom from 'components/AudioOnlyEvent/hooks/useCreateRoom/useCreateRoom';

export default function RoomCreateButtons() {
  const { canCreateRoom, createRoom } = useCreateRoom();
  return (
    <Button onClick={() => createRoom()} disabled={!canCreateRoom}>
      <FormattedMessage id="sidebar.createAudioP2pBtn" defaultMessage="Create Audio Room" />
    </Button>
  );
}
