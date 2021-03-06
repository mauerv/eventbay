import React from 'react';
import { RoomInstance } from 'twilio';
import { Callback } from 'types';

import ParticipantList from '../ParticipantList/ParticipantList';
import RoomTitle from './RoomTitle/RoomTitle';
import ListItem from '@material-ui/core/ListItem';

type Props = {
  room: RoomInstance;
  onRoomClick: Callback;
  selected: boolean;
  disabled: boolean;
};

export default function RoomListItem({ room, onRoomClick, selected, disabled }: Props) {
  return (
    <>
      <RoomTitle
        roomName={room.uniqueName}
        onRoomClick={onRoomClick}
        disabled={disabled}
        selected={selected}
        maxParticipants={room.maxParticipants}
        currentParticipants={room.participants.length}
        roomType={room.roomType}
      />
      {room.participants.length !== 0 && (
        <ListItem>
          <ParticipantList participants={room.participants} />
        </ListItem>
      )}
    </>
  );
}
