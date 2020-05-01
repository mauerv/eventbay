import EventEmitter from 'events';
import { useCallback, useEffect, useRef, useState } from 'react';
import Video, { LocalTrack, Room } from 'twilio-video';
import { Callback } from 'types';
import { p2pOptions, p2pAudioOptions } from './connectionOptions';

export default function useRoom(localTracks: LocalTrack[], onError: Callback) {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room);
  const [isConnecting, setIsConnecting] = useState(false);
  const disconnectHandlerRef = useRef<() => void>(() => {});
  const localTracksRef = useRef<LocalTrack[]>([]);
  const isHookMounted = useRef(true);

  useEffect(() => {
    // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
    // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
    // once the user is connected to the room.
    localTracksRef.current = localTracks;
  }, [localTracks]);

  useEffect(() => {
    return () => {
      isHookMounted.current = false;
    };
  }, []);

  const connect = useCallback(
    (token, roomType) => {
      setIsConnecting(true);
      const options = roomType === 'video' ? p2pOptions : p2pAudioOptions;

      return Video.connect(token, { ...options, tracks: localTracksRef.current }).then(
        newRoom => {
          setRoom(newRoom);

          newRoom.once('disconnected', () => {
            // Reset the room only after all other `disconnected` listeners have been called.
            setTimeout(() => isHookMounted.current && setRoom(new EventEmitter() as Room));
            window.removeEventListener('beforeunload', disconnectHandlerRef.current);
          });

          localTracksRef.current.forEach(track => {
            // Tracks can be supplied as arguments to the Video.connect() function and they will automatically be published.
            // However, tracks must be published manually in order to set the priority on them.
            // All video tracks are published with 'low' priority. This works because the video
            // track that is displayed in the 'MainParticipant' component will have its priority
            // set to 'high' via track.setPriority()
            if (track.kind === 'audio') {
              newRoom.localParticipant.publishTrack(track);
            }
            if (track.kind === 'video' && roomType === 'video') {
              newRoom.localParticipant.publishTrack(track);
            }
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
    [onError]
  );

  return { room, isConnecting, connect };
}
