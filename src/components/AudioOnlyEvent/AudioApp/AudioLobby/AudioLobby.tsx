import React from 'react';
import { Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Sidebar from 'components/Sidebar/Sidebar';
import Controls from 'components/Controls/Controls';
import LocalAudioPreview from 'components/AudioOnlyEvent/LocalAudioPreview/LocalAudioPreview';
import ReconnectingNotification from 'components/ReconnectingNotification/ReconnectingNotification';
import AudioRoom from 'components/AudioRoom/AudioRoom';
import RoomsProvider from 'components/RoomsProvider/RoomsProvider';
import MediaDevicesDialog from 'components/MediaDevicesDialog/MediaDevicesDialog';
import ChatProvider from 'components/ChatProvider/ChatProvider';
import AudioContextProvider from 'components/AudioContextProvider/AudioContextProvider';
import { Main } from './styles';

import useRoomState from 'hooks/useRoomState/useRoomState';
import useAudioContext from 'components/AudioOnlyEvent/useAudioContext/useAudioContext';
import { useAppState } from 'state';

const App = () => {
  const roomState = useRoomState();
  const { nick } = useAppState();
  const { isConnecting } = useAudioContext();
  let content;

  if (!nick) return <Redirect to="/" />;

  if (roomState === 'disconnected' && !isConnecting) {
    content = <LocalAudioPreview />;
  } else {
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

export default hot(module)(App);
