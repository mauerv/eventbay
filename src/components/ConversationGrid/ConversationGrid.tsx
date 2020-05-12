import React from 'react';
import { Room } from 'twilio-video';
import RoomList from 'components/Sidebar/RoomList/RoomList';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useJoinRoom from 'components/AudioOnlyEvent/hooks/useJoinRoom/useJoinRoom';

import useRooms from 'components/RoomsProvider/useRooms/useRooms';

export default function ConversationGrid() {
  const { roomsState } = useRooms();
  const { room } = useMediaContext();
  const { canJoinRooms, joinRoom } = useJoinRoom();

  return (
    <RoomList
      rooms={roomsState.rooms}
      onRoomClick={joinRoom}
      canJoinRoom={canJoinRooms}
      activeRoom={room.name}
    />
  );
}
