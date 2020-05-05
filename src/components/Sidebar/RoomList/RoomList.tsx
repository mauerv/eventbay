import React from 'react';
import { RoomInstance } from 'twilio';

import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';
import { Callback } from 'types';
import RoomListItem from '../RoomListItem/RoomListItem';
import { List } from './styles';

type Props = {
  rooms: RoomInstance[];
  onRoomClick: Callback;
  activeRoom: string;
  canJoinRoom: boolean;
};

export default function RoomList({ rooms, onRoomClick, activeRoom, canJoinRoom }: Props) {
  const headerText = useFormatMessage({ id: 'roomlist.headerText', defaultMessage: 'Open Rooms' });

  return (
    <List headerText={headerText}>
      {rooms &&
        rooms.map(room => (
          <RoomListItem
            key={room.sid}
            room={room}
            onRoomClick={onRoomClick}
            selected={activeRoom === room.uniqueName}
            disabled={!canJoinRoom}
          />
        ))}
    </List>
  );
}
