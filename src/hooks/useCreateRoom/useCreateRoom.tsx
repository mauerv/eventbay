import { RoomType } from 'types';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';

/*
	Props: 
		- roomType 
		- canCreateRoom
		- connect
		- getToken
		- getRoomName
		- setRoomType

*/

export default function useCreateRoom(roomType: RoomType) {
  /*
  const { logEvent } = useAnalytics();

  if (!canCreateRoom) return;

  const roomName = getRoomName(roomsState.rooms) as string; // TODO: Remove when solved.

  const token = await fetch('/api/rooms', {
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
	*/
}
