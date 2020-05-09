import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useCanJoinRooms from 'hooks/useJoinRoom/useCanJoinRooms/useCanJoinRooms';
import { useAppState } from 'state';

export default function useJoinRoom() {
  const { room, connect } = useMediaContext();
  const { nick, getToken } = useAppState();
  const { logEvent } = useAnalytics();
  const roomState = useRoomState();
  const canJoinRooms = useCanJoinRooms();

  const joinRoom = async (roomName: string) => {
    if (!canJoinRooms) return;
    if (roomState === 'connected') {
      room.disconnect();
      logEvent('ROOM_SWITCH');
    } else {
      logEvent('ROOM_JOIN');
    }
    const token = await getToken(nick, roomName);
    connect(token);
  };

  return { canJoinRooms, joinRoom };
}
