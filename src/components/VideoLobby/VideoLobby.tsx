import React from 'react';
import { Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Sidebar from 'components/Sidebar/Sidebar';
import Controls from 'components/Controls/Controls';
import LocalVideoPreview from 'components/LocalVideoPreview/LocalVideoPreview';
import ReconnectingNotification from 'components/ReconnectingNotification/ReconnectingNotification';
import AudioRoom from 'components/AudioRoom/AudioRoom';
import GridRoom from 'components/GridRoom/GridRoom';
import LargeRoom from 'components/LargeRoom/LargeRoom';
import RoomsProvider from 'components/RoomsProvider/RoomsProvider';
import MediaDevicesDialog from 'components/MediaDevicesDialog/MediaDevicesDialog';
import ChatProvider from 'components/ChatProvider/ChatProvider';
import AudioContextProvider from 'components/AudioContextProvider/AudioContextProvider';
import { Main } from './styles';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import { useAppState } from 'state';

const VideoLobby = () => {
  const roomState = useRoomState();
  const { nick } = useAppState();
  const { isConnecting, roomType } = useMediaContext();
  let content;

  if (!nick) return <Redirect to="/" />;

  if (roomState === 'disconnected' && !isConnecting) {
    content = <LocalVideoPreview />;
  } else if (roomState === 'disconnected') {
    content = null;
  } else if (roomType === 'video-p2p' || roomType === 'video-group-small') {
    content = <GridRoom />;
  } else if (roomType === 'video-group-large') {
    content = <LargeRoom />;
  } else if (roomType === 'audio-p2p') {
    content = (
      <AudioContextProvider>
        <AudioRoom />
      </AudioContextProvider>
    );
  }

  return (
    <>
      <RoomsProvider>
        <Sidebar />
      </RoomsProvider>
      <Main>
        <ChatProvider>
          {content}
          <Controls />
        </ChatProvider>
      </Main>
      <ReconnectingNotification />
      <MediaDevicesDialog />
    </>
  );
};

export default hot(module)(VideoLobby);
