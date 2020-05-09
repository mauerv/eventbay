import React, { createContext, ReactNode } from 'react';
import { Room, TwilioError, LocalAudioTrack } from 'twilio-video';

import { Callback, ErrorCallback } from 'types';
import useHandleRoomDisconnectionErrors from 'components/VideoProvider/useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors';
import useHandleOnDisconnect from 'components/VideoProvider/useHandleOnDisconnect/useHandleOnDisconnect';
import useHandleTrackPublicationFailed from 'components/VideoProvider/useHandleTrackPublicationFailed/useHandleTrackPublicationFailed';
import useLocalTracks from './useLocalTracks/useLocalTracks';
import useAudioRoom from './useAudioRoom/useAudioRoom';
import useErrorTracking from 'hooks/useErrorTracking/useErrorTracking';

interface Context {
  room: Room;
  localTracks: LocalAudioTrack[];
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: ErrorCallback;
  onDisconnect: Callback;
  stopLocalTracks: Callback;
}

interface Props {
  onError: ErrorCallback;
  onDisconnect?: Callback;
  children: ReactNode;
}

export const AudioContext = createContext<Context>(null!);

export default function AudioProvider({
  children,
  onError = () => {},
  onDisconnect = () => {},
}: Props) {
  const { logError } = useErrorTracking();

  const onErrorCallback = (error: TwilioError) => {
    logError(error.code, error.message);
    onError(error);
  };

  const { localTracks, stopLocalTracks } = useLocalTracks();
  const { room, isConnecting, connect } = useAudioRoom(localTracks, onErrorCallback);

  // Register onError and onDisconnect callback functions.
  useHandleRoomDisconnectionErrors(room, onError);
  useHandleTrackPublicationFailed(room, onError);
  useHandleOnDisconnect(room, onDisconnect);

  return (
    <AudioContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError: onErrorCallback,
        onDisconnect,
        stopLocalTracks,
        connect,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
