import { Participant, Room } from 'twilio-video';

export const SET_ROOMS_BEGIN = 'SET_ROOMS_BEGIN';
export const SET_ROOMS_SUCCESS = 'SET_ROOMS_SUCCESS';
export const SET_ROOMS_ERROR = 'SET_ROOMS_ERROR';
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const ADD_ROOM_PARTICIPANT = 'ADD_ROOM_PARTICIPANT';
export const REMOVE_ROOM_PARTICIPANT = 'REMOVE_ROOM_PARTICIPANT';

type Action =
  | { type: 'SET_ROOMS_BEGIN' }
  | { type: 'SET_ROOMS_ERROR' }
  | { type: 'SET_ROOMS_SUCCESS'; payload: any }
  | { type: 'ADD_ROOM'; payload: { room: Room[] } }
  | { type: 'REMOVE_ROOM'; payload: { sid: string } }
  | { type: 'ADD_ROOM_PARTICIPANT'; payload: { roomName: string; participant: Participant } }
  | { type: 'REMOVE_ROOM_PARTICIPANT'; payload: { roomName: string; participant: Participant } };

type State = {
  rooms: Room[];
  isFetching: boolean;
  error: boolean;
};

export const roomsInitialState: State = {
  rooms: [],
  isFetching: false,
  error: false,
};

export default (state: State, action: Action) => {
  switch (action.type) {
    case SET_ROOMS_BEGIN:
      return {
        ...roomsInitialState,
        isFetching: true,
      };
    case SET_ROOMS_SUCCESS:
      return {
        rooms: action.payload.rooms,
        isFetching: false,
        error: false,
      };
    case SET_ROOMS_ERROR:
      return {
        ...roomsInitialState,
        error: true,
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload.room],
      };
    case REMOVE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(room => room.sid !== action.payload.sid),
      };
    case ADD_ROOM_PARTICIPANT:
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (room.uniqueName === action.payload.roomName) {
            return {
              ...room,
              participants: [...room.participants, action.payload.participant],
            };
          } else {
            return room;
          }
        }),
      };
    case REMOVE_ROOM_PARTICIPANT:
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (room.uniqueName === action.payload.roomName) {
            return {
              ...room,
              // @ts-ignore TODO: We Inherit from twilio-video Room instead of server. Participants type is map and not array.
              participants: room.participants.filter(p => p.sid !== action.payload.participant.sid),
            };
          } else {
            return room;
          }
        }),
      };
    default:
      throw new Error();
  }
};
