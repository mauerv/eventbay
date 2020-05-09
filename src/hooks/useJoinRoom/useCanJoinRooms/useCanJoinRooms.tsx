import { useState, useEffect } from 'react';

import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import { useAppState } from 'state';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';

export default function useCanJoinRooms() {
  const { isConnecting } = useMediaContext();
  const { isFetching } = useAppState();
  const { roomsState } = useRooms();

  const [canJoinRooms, setCanJoinRooms] = useState(false);
  useEffect(() => {
    const _canJoinRooms = !isFetching && !isConnecting && !roomsState.isFetching;
    setCanJoinRooms(_canJoinRooms);
  }, [isFetching, isConnecting, roomsState]);

  return canJoinRooms;
}
