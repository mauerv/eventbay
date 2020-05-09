import React from 'react';

import VideoLobby from 'components/VideoLobby/VideoLobby';
import AudioLobby from 'components/AudioOnlyEvent/AudioLobby/AudioLobby';
import { useAppState } from 'state';
import MediaDevicesProvider from 'components/MediaDevicesProvider/MediaDevicesProvider';
import ErrorDialog from 'components/ErrorDialog/ErrorDialog';
import MediaProvider from 'components/MediaProvider/MediaProvider';

export default function App() {
  const { error, setError } = useAppState();

  return (
    <MediaDevicesProvider>
      <MediaProvider onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        {process.env.REACT_APP_AUDIO_ONLY ? <AudioLobby /> : <VideoLobby />}
      </MediaProvider>
    </MediaDevicesProvider>
  );
}
