import { useState, useEffect } from 'react';

import useCanJoinRooms from 'hooks/useJoinRoom/useCanJoinRooms/useCanJoinRooms';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import roomNames from 'hooks/useRoomName/roomNames.json';

export default function useCanCreateRoom() {
  const [canCreateRoom, setCanCreateRoom] = useState(false);
  const canJoinRooms = useCanJoinRooms();
  const { roomsState } = useRooms();

  useEffect(() => {
    const _canCreateRoom = canJoinRooms && roomsState.rooms.length < roomNames.length;
    setCanCreateRoom(_canCreateRoom);
  }, [canJoinRooms, roomsState]);

  return canCreateRoom;
}
