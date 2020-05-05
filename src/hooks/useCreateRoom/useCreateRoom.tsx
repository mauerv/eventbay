import { RoomType } from 'types';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useRoomName from 'hooks/useRoomName/useRoomName';

/*
	Props: 
		- roomType 
		- canCreateRoom
		- connect
		- getToken
		- getRoomName
		- setRoomType

*/

export default function useCreateRoom() {
  // const { logEvent } = useAnalytics();
  // const roomName = useRoomName();
  // const canCreateRoom = canJoinRoom && roomsState.rooms.length < roomNames.length;
  // if (!canCreateRoom) return;
  // const token = await fetch('/api/rooms', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     roomName,
  //     roomType,
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(() => getToken(nick, roomName));
  // if (roomState === 'connected') room.disconnect();
  // setRoomType(roomType);
  // connect(token, roomType);
  // const createRoom = (roomType: RoomType) => {
  // 	logEvent('ROOM_CREATE', { roomType });
  // };
  // return createRoom;
}
