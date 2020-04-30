import { Room } from 'twilio-video';

const roomNames = [
  'Manija',
  'Vipassana',
  'Paz',
  'HODL',
  'Le Poker',
  'REN',
  'Eze',
  'Ezte',
  'Maquina',
  'Sam',
  'Harris',
  'Una Vela',
  'Dos Velas',
  'Crypto',
  'Satoshi',
  'Bonnie',
  'Clyde',
  'BTC',
];

export const getRoomName = (liveRooms: Room[]) => {
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
};

export default roomNames;
