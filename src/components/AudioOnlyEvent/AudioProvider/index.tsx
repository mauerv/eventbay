import React, { createContext, ReactNode, useState } from 'react';
import { Room, TwilioError, LocalAudioTrack } from 'twilio-video';

import { Callback, ErrorCallback } from 'types';
import useErrorTracking from 'hooks/useErrorTracking/useErrorTracking';

interface Context {
  room: Room;
  localAudioTrack: LocalAudioTrack;
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: ErrorCallback;
  onDisconnect: Callback;
  stopLocalTrack: Callback;
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

  // Need custom useLocalAudioTrack
  // Need custom useAudioRoom

  // Register onError and onDisconnect callback functions.
  useHandleRoomDisconnectionErrors(room, onError);
  useHandleTrackPublicationFailed(room, onError);
  useHandleOnDisconnect(room, onDisconnect);

  return (
    <AudioContext.Provider
      value={{
        room,
        localAudioTrack,
        isConnecting,
        onError: onErrorCallback,
        onDisconnect,
        stopLocalAudioTrack,
        connect,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
