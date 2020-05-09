import { useEffect, useState } from 'react';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';

type RoomStateType = 'disconnected' | 'connected' | 'reconnecting';

export default function useRoomState() {
  const { room } = useMediaContext();
  const [state, setState] = useState<RoomStateType>('disconnected');

  useEffect(() => {
    const setRoomState = () => setState((room.state || 'disconnected') as RoomStateType);
    setRoomState();
    room
      .on('disconnected', setRoomState)
      .on('reconnected', setRoomState)
      .on('reconnecting', setRoomState);
    return () => {
      room
        .off('disconnected', setRoomState)
        .off('reconnected', setRoomState)
        .off('reconnecting', setRoomState);
    };
  }, [room]);

  return state;
}
