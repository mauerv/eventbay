import React, { useMemo } from 'react';

import { Callback } from 'types';
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

  const roomType = useMemo(() => {
    // Hay 4 types posibles: audio-p2p, video-p2p, video-group-large, video-group-small
    return maxParticipants > 4 ? 'audio-p2p' : 'video-p2p';
  }, [maxParticipants]);

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
