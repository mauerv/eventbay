import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useRoomName from 'hooks/useRoomName/useRoomName';
import useCanCreateRoom from 'hooks/useCreateRoom/useCanCreateRoom/useCanCreateRoom';
import { useAppState } from 'state';
import useRoomState from 'hooks/useRoomState/useRoomState';

export default function useCreateRoom() {
  const { connect, room } = useMediaContext();
  const { nick, getToken } = useAppState();
  const { logEvent } = useAnalytics();
  const roomName = useRoomName();
  const canCreateRoom = useCanCreateRoom();
  const roomState = useRoomState();

  const createRoom = async () => {
    if (!canCreateRoom) return;

    const token = await fetch('/audio/rooms', {
      method: 'POST',
      body: JSON.stringify({
        roomName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => getToken(nick, roomName));

    if (roomState === 'connected') room.disconnect();

    connect(token);

    logEvent('ROOM_CREATE');
  };

  return { canCreateRoom, createRoom };
}
