import React from 'react';
import { Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import MenuBar from '../MenuBar/MenuBar';
import Controls from 'components/AudioOnlyEvent/Controls/Controls';
import LocalAudioPreview from 'components/AudioOnlyEvent/LocalAudioPreview/LocalAudioPreview';
import ReconnectingNotification from 'components/ReconnectingNotification/ReconnectingNotification';
import AudioRoom from 'components/AudioRoom/AudioRoom';
import RoomsProvider from 'components/RoomsProvider/RoomsProvider';
import MediaDevicesDialog from 'components/MediaDevicesDialog/MediaDevicesDialog';
import ChatProvider from 'components/ChatProvider/ChatProvider';
import AudioContextProvider from 'components/AudioContextProvider/AudioContextProvider';
import { Content } from './styles';
import ConversationGrid from 'components/ConversationGrid/ConversationGrid';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import { useAppState } from 'state';
import Sidebar from 'components/AudioOnlyEvent/Sidebar/Sidebar';
import Hidden from '@material-ui/core/Hidden';

const AudioLobby = () => {
  const roomState = useRoomState();
  const { nick } = useAppState();
  const { isConnecting } = useMediaContext();
  let content;

  if (!nick) return <Redirect to="/" />;

  if (roomState === 'disconnected' && !isConnecting) {
    content = <LocalAudioPreview />;
  } else if (roomState === 'disconnected') {
    content = null;
  } else {
    content = (
      <AudioContextProvider>
        <AudioRoom />
      </AudioContextProvider>
    );
  }

  return (
    <RoomsProvider>
      <MenuBar />
      <Hidden smUp>
        <Sidebar />
      </Hidden>
      <Content>
        <ConversationGrid />
        <ChatProvider>
          {content}
          <Controls />
        </ChatProvider>
        <ReconnectingNotification />
        <MediaDevicesDialog />
      </Content>
    </RoomsProvider>
  );
};

export default hot(module)(AudioLobby);
