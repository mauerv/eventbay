import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import roomNames from './roomNames.json';

export default function useRoomName() {
  const { roomsState } = useRooms();
  const liveRooms = roomsState.rooms;

  for (let i = 0; i < roomNames.length; i++) {
    let found = false;
    for (let j = 0; j < liveRooms.length; j++) {
      if (roomNames[i] === liveRooms[j].uniqueName) {
        found = true;
        break;
      }
    }
    if (found === false) return roomNames[i];
  }

  throw Error('Out of room names.');
}
