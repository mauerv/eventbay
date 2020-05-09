import { useCallback, useEffect, useRef, useState } from 'react';
import Video, { LocalAudioTrack, Room } from 'twilio-video';
import EventEmitter from 'events';

import { Callback } from 'types';
import options from './connectionOptions';
import useIsMounted from 'hooks/useIsMounted/useIsMounted';

export default function useRoom(localAudioTrack: LocalAudioTrack, onError: Callback) {
  const [room, setRoom] = useState<Room>(new EventEmitter() as Room);
  const [isConnecting, setIsConnecting] = useState(false);
  const disconnectHandlerRef = useRef<() => void>(() => {});
  const localAudioTrackRef = useRef<LocalAudioTrack>(null!);
  const isMounted = useIsMounted();

  useEffect(() => {
    // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
    // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
    // once the user is connected to the room.
    localAudioTrackRef.current = localAudioTrack;
  }, [localAudioTrack]);

  useEffect(() => {
    return () => {
      isHookMounted.current = false;
    };
  }, []);
}
