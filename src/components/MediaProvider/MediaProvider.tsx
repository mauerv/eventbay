import React, { createContext, ReactNode } from 'react';
import { Room, TwilioError, LocalAudioTrack, LocalVideoTrack } from 'twilio-video';

import { Callback, ErrorCallback } from 'types';
import { SelectedParticipantProvider } from './useSelectedParticipant/useSelectedParticipant';
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors';
import useHandleOnDisconnect from './useHandleOnDisconnect/useHandleOnDisconnect';
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed';
import useErrorTracking from 'hooks/useErrorTracking/useErrorTracking';
import useVideo from './useVideo/useVideo';
import useAudio from 'components/AudioOnlyEvent/hooks/useAudio/useAudio';

type Context = {
  room: Room;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  connect: (token: string, roomType: string) => Promise<void>;
  onError: ErrorCallback;
  onDisconnect: Callback;
  stopLocalTracks: Callback;
  getLocalVideoTrack: () => Promise<LocalVideoTrack>;
  roomType: string;
  setRoomType: Callback;
};

type Props = {
  onError: ErrorCallback;
  onDisconnect?: Callback;
  children: ReactNode;
};

export const MediaContext = createContext<Context>(null!);

export default function MediaProvider({
  children,
  onError = () => {},
  onDisconnect = () => {},
}: Props) {
  const { logError } = useErrorTracking();

  const onErrorCallback = (error: TwilioError) => {
    logError(error.code, error.message);
    onError(error);
  };

  let contextValue = {
    onError: onErrorCallback,
    onDisconnect,
  } as Context;

  if (process.env.REACT_APP_AUDIO_ONLY) {
    contextValue = {
      ...contextValue,
      ...useAudio(onErrorCallback), // eslint-disable-line react-hooks/rules-of-hooks
    };
  } else {
    contextValue = {
      ...contextValue,
      ...useVideo(onErrorCallback), // eslint-disable-line react-hooks/rules-of-hooks
    };
  }

  // Register onError and onDisconnect callback functions.
  useHandleRoomDisconnectionErrors(contextValue.room, onError);
  useHandleTrackPublicationFailed(contextValue.room, onError);
  useHandleOnDisconnect(contextValue.room, onDisconnect);

  return (
    <MediaContext.Provider value={contextValue}>
      <SelectedParticipantProvider room={contextValue.room}>{children}</SelectedParticipantProvider>
    </MediaContext.Provider>
  );
}
