import { ErrorCallback } from 'types';

import useLocalTracks from '../useLocalTracks/useLocalTracks';
import useAudioRoom from '../useAudioRoom/useAudioRoom';

export default function AudioProvider(onError: ErrorCallback) {
  const { localTracks, stopLocalTracks } = useLocalTracks();
  const { room, isConnecting, connect } = useAudioRoom(localTracks, onError);

  return { localTracks, stopLocalTracks, room, isConnecting, connect };
}
