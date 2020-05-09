import React from 'react';
import AudioLobby from './AudioLobby/AudioLobby';

import { useAppState } from 'state';
import MediaDevicesProvider from 'components/MediaDevicesProvider/MediaDevicesProvider';
import ErrorDialog from 'components/ErrorDialog/ErrorDialog';
import AudioProvider from 'components/AudioOnlyEvent/AudioProvider';

export default function VideoApp() {
  const { error, setError } = useAppState();

  return (
    <MediaDevicesProvider>
      <AudioProvider onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        <AudioLobby />
      </AudioProvider>
    </MediaDevicesProvider>
  );
}
