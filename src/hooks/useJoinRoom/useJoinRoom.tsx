import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useCanJoinRooms from './useCanJoinRooms/useCanJoinRooms';
import { useAppState } from 'state';
import { RoomType } from 'types';

export default function useJoinRoom() {
  const { room, setRoomType, connect } = useVideoContext();
  const { nick, getToken } = useAppState();
  const { logEvent } = useAnalytics();
  const roomState = useRoomState();
  const canJoinRooms = useCanJoinRooms();

  const joinRoom = async (roomName: string, roomType: RoomType) => {
    if (!canJoinRooms) return;
    roomState === 'connected'
      ? logEvent('ROOM_SWITCH', { roomType })
      : logEvent('ROOM_JOIN', { roomType });
    if (roomState === 'connected') room.disconnect();
    const token = await getToken(nick, roomName);
    setRoomType(roomType);
    connect(token, roomType);
  };

  return { canJoinRooms, joinRoom };
}
