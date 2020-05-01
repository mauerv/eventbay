import React, { useMemo } from 'react';

import { Callback } from 'types';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ParticipantNumber from '../../ParticipantNumber/ParticipantNumber';
import { RoomTitleText } from './styles';

type Props = {
  roomName: string;
  disabled: boolean;
  selected: boolean;
  onRoomClick: Callback;
  maxParticipants: number;
  currentParticipants: number;
};

const RoomTitle = ({
  roomName,
  disabled,
  selected,
  onRoomClick,
  maxParticipants,
  currentParticipants,
}: Props) => {
  const isJoinable = useMemo(() => !selected && currentParticipants < maxParticipants, [
    selected,
    currentParticipants,
    maxParticipants,
  ]);

  const roomType = useMemo(() => (maxParticipants > 4 ? 'audio' : 'video'), [maxParticipants]);

  return (
    <ListItem
      // @ts-ignore TO-DO learn how to solve this issue.
      button={isJoinable}
      onClick={() => isJoinable && onRoomClick(roomName, roomType)}
      disabled={disabled}
      selected={selected}
    >
      <RoomTitleText disableTypography>
        <Typography color="primary">{roomName}</Typography>
        <ParticipantNumber max={maxParticipants} current={currentParticipants} />
      </RoomTitleText>
    </ListItem>
  );
};

export default RoomTitle;
