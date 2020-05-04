import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Callback } from 'types';
import { Button } from '../styles';

type Props = {
  handleCreateRoom: Callback;
  canCreateRoom: boolean;
};

export default function RoomCreateButtons({ handleCreateRoom, canCreateRoom }: Props) {
  return (
    <>
      <Button onClick={() => handleCreateRoom('video-group-large')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createGroupLargeBtn" defaultMessage="Create Large Room" />
      </Button>
      <Button onClick={() => handleCreateRoom('video-group-small')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createGroupSmallBtn" defaultMessage="Create Small Room" />
      </Button>
      <Button onClick={() => handleCreateRoom('video-p2p')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createVideoP2pBtn" defaultMessage="Create P2P Room" />
      </Button>
      <Button onClick={() => handleCreateRoom('audio-p2p')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createAudioP2pBtn" defaultMessage="Create Audio Room" />
      </Button>
    </>
  );
}
