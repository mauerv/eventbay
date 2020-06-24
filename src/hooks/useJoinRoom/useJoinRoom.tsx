import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useCanJoinRooms from './useCanJoinRooms/useCanJoinRooms';
import { useAppState } from 'state';
import { RoomType } from 'types';

export default function useJoinRoom() {
  const { room, setRoomType, connect } = useMediaContext();
  const { nick, getToken } = useAppState();
  const { logEvent } = useAnalytics();
  const roomState = useRoomState();
  const canJoinRooms = useCanJoinRooms();

  const joinRoom = async (roomName: string, roomType: RoomType) => {
    if (!canJoinRooms) return;
    if (roomState === 'connected') {
      room.disconnect();
      logEvent('ROOM_SWITCH', { roomType });
    } else {
      logEvent('ROOM_JOIN', { roomType });
    }
    const token = await getToken(nick, roomName);
    setRoomType(roomType);
    connect(token, roomType);
  };

  return { canJoinRooms, joinRoom };
}
