import React, { useMemo } from 'react';
import { RoomInstance } from 'twilio';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import useJoinRoom from 'components/AudioOnlyEvent/hooks/useJoinRoom/useJoinRoom';

type Props = {
  room: RoomInstance;
};

export default function ConversationGridItem({ room }: Props) {
  const { joinRoom, canJoinRooms } = useJoinRoom();

  const isJoinable = useMemo(() => {
    if (canJoinRooms) {
      if (room.participants.length < room.maxParticipants) {
        return true;
      }
    }
    return false;
  }, [room, canJoinRooms]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{room.uniqueName}</Typography>
        {room.participants.map((participant: any) => (
          <Typography>{participant.identity}</Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button
          disabled={!isJoinable}
          onClick={() => isJoinable && joinRoom(room.uniqueName)}
          variant="outlined"
          size="small"
          color="primary"
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
}
