import { RoomType } from 'types';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useRoomName from 'hooks/useRoomName/useRoomName';
import useCanCreateRoom from './useCanCreateRoom/useCanCreateRoom';
import { useAppState } from 'state';
import useRoomState from 'hooks/useRoomState/useRoomState';

export default function useCreateRoom() {
  const { connect, room, setRoomType } = useVideoContext();
  const { nick, getToken } = useAppState();
  const { logEvent } = useAnalytics();
  const roomName = useRoomName();
  const canCreateRoom = useCanCreateRoom();
  const roomState = useRoomState();

  const createRoom = async (roomType: RoomType) => {
    if (!canCreateRoom) return;

    const token = await fetch('/video/rooms', {
      method: 'POST',
      body: JSON.stringify({
        roomName,
        roomType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => getToken(nick, roomName));

    if (roomState === 'connected') room.disconnect();

    setRoomType(roomType);
    connect(token, roomType);

    logEvent('ROOM_CREATE', { roomType });
  };

  return { canCreateRoom, createRoom };
}
