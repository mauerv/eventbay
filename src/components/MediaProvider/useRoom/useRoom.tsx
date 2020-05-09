import EventEmitter from 'events';
import { useCallback, useEffect, useRef, useState } from 'react';
import Video, { LocalTrack, Room } from 'twilio-video';
import { Callback } from 'types';
import { selectConnectionOptions } from './connectionOptions';
import useIsMounted from 'hooks/useIsMounted/useIsMounted';

export default function useRoom(localTracks: LocalTrack[], onError: Callback) {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room);
  const [isConnecting, setIsConnecting] = useState(false);
  const disconnectHandlerRef = useRef<() => void>(() => {});
  const localTracksRef = useRef<LocalTrack[]>([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
    // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
    // once the user is connected to the room.
    localTracksRef.current = localTracks;
  }, [localTracks]);

  const connect = useCallback(
    (token, roomType) => {
      setIsConnecting(true);
      const options = selectConnectionOptions(roomType);

      return Video.connect(token, { ...options, tracks: localTracksRef.current }).then(
        newRoom => {
          setRoom(newRoom);

          newRoom.once('disconnected', () => {
            // Reset the room only after all other `disconnected` listeners have been called.
            setTimeout(() => isMounted.current && setRoom(new EventEmitter() as Room));
            window.removeEventListener('beforeunload', disconnectHandlerRef.current);
          });

          localTracksRef.current.forEach(track => {
            if (track.kind === 'audio') {
              newRoom.localParticipant.publishTrack(track);
            }
            if (track.kind === 'video') {
              if (roomType === 'video-group-large') {
                newRoom.localParticipant.publishTrack(track, { priority: 'low' });
              } else if (roomType === 'video-group-small' || roomType === 'video-p2p') {
                newRoom.localParticipant.publishTrack(track);
              }
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
    [onError, isMounted]
  );

  return { room, isConnecting, connect };
}
