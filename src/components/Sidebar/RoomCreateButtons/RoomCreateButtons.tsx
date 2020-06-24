import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../styles';
import useCreateRoom from 'hooks/useCreateRoom/useCreateRoom';

export default function RoomCreateButtons() {
  const { canCreateRoom, createRoom } = useCreateRoom();
  return (
    <>
      <Button onClick={() => createRoom('video-group-large')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createGroupLargeBtn" defaultMessage="Create Large Room" />
      </Button>
      <Button onClick={() => createRoom('video-p2p')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createGroupSmallBtn" defaultMessage="Create Small Room" />
      </Button>
      <Button onClick={() => createRoom('audio-p2p')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createAudioP2pBtn" defaultMessage="Create Audio Room" />
      </Button>
    </>
  );
}
