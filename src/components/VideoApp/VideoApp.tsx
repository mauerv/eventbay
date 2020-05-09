import React from 'react';
import VideoLobby from './VideoLobby/VideoLobby';

import { useAppState } from 'state';
import MediaDevicesProvider from 'components/MediaDevicesProvider/MediaDevicesProvider';
import ErrorDialog from 'components/ErrorDialog/ErrorDialog';
import { VideoProvider } from 'components/VideoProvider';

export default function VideoApp() {
  const { error, setError } = useAppState();

  return (
    <MediaDevicesProvider>
      <VideoProvider onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        <VideoLobby />
      </VideoProvider>
    </MediaDevicesProvider>
  );
}
