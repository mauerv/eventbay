import React from 'react';

import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';
import RoomListItem from '../RoomListItem/RoomListItem';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import useJoinRoom from 'components/AudioOnlyEvent/hooks/useJoinRoom/useJoinRoom';
import { List } from './styles';

export default function RoomList() {
  const headerText = useFormatMessage({ id: 'roomlist.headerText', defaultMessage: 'Open Talks' });
  const { room } = useMediaContext();
  const { roomsState } = useRooms();
  const { canJoinRooms, joinRoom } = useJoinRoom();

  return (
    <List headerText={headerText}>
      {roomsState.rooms &&
        roomsState.rooms.map((roomItem: any) => (
          <RoomListItem
            key={roomItem.sid}
            room={roomItem}
            onRoomClick={joinRoom}
            selected={room.name === roomItem.uniqueName}
            disabled={!canJoinRooms}
          />
        ))}
    </List>
  );
}
