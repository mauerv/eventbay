import { useState } from 'react';

import { ErrorCallback } from 'types';
import useLocalTracks from '../useLocalTracks/useLocalTracks';
import useRoom from '../useRoom/useRoom';

export default function useVideo(onError: ErrorCallback) {
  const [roomType, setRoomType] = useState<string>(null!);

  const { localTracks, getLocalVideoTrack, stopLocalTracks } = useLocalTracks();
  const { room, isConnecting, connect } = useRoom(localTracks, onError);

  return {
    localTracks,
    getLocalVideoTrack,
    stopLocalTracks,
    room,
    isConnecting,
    connect,
    roomType,
    setRoomType,
  };
}
