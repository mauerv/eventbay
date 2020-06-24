import React, { useMemo } from 'react';

import { Callback, RoomType } from 'types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CapacityIndicator from 'components/CapacityIndicator/CapacityIndicator';
import { RoomTitleText } from './styles';

type Props = {
  roomName: string;
  disabled: boolean;
  selected: boolean;
  onRoomClick: Callback;
  maxParticipants: number;
  currentParticipants: number;
  roomType: RoomType;
};

const RoomTitle = ({
  roomName,
  disabled,
  selected,
  onRoomClick,
  roomType,
  maxParticipants,
  currentParticipants,
}: Props) => {
  const isJoinable = useMemo(() => !selected && currentParticipants < maxParticipants, [
    selected,
    currentParticipants,
    maxParticipants,
  ]);

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
        <CapacityIndicator max={maxParticipants} current={currentParticipants} />
      </RoomTitleText>
    </ListItem>
  );
};

export default RoomTitle;
