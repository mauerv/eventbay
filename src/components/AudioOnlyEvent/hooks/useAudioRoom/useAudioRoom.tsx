import { useCallback, useEffect, useRef, useState } from 'react';
import Video, { LocalAudioTrack, Room } from 'twilio-video';
import EventEmitter from 'events';

import { Callback } from 'types';
import options from './connectionOptions';
import useIsMounted from 'hooks/useIsMounted/useIsMounted';

export default function useRoom(localTracks: LocalAudioTrack[], onError: Callback) {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room);
  const [isConnecting, setIsConnecting] = useState(false);
  const disconnectHandlerRef = useRef<() => void>(() => {});
  const localTracksRef = useRef<LocalAudioTrack[]>([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
    // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
    // once the user is connected to the room.
    localTracksRef.current = localTracks;
  }, [localTracks]);

  const connect = useCallback(
    token => {
      setIsConnecting(true);
      return Video.connect(token, { ...options, tracks: localTracksRef.current }).then(
        newRoom => {
          setRoom(newRoom);

          newRoom.once('disconnected', () => {
            // Reset the room only after all other `disconnected` listeners have been called.
            setTimeout(() => isMounted.current && setRoom(new EventEmitter() as Room));
            window.removeEventListener('beforeunload', disconnectHandlerRef.current);
          });

          disconnectHandlerRef.current = () => newRoom.disconnect();
          setIsConnecting(false);

          // Add a listener to disconnect from the room when a user closes their browser
          window.addEventListener('beforeunload', disconnectHandlerRef.current);
        },
        error => {
          onError(error);
          setIsConnecting(false);
        }
      );
    },
    [onError, isMounted]
  );

  return { room, isConnecting, connect };
}
