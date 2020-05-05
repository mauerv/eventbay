import { renderHook } from '@testing-library/react-hooks';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';

import useRoomName from './useRoomName';

jest.mock('./roomNames.json', () => ['captain', 'fuzzy', 'boots']);
jest.mock('components/RoomsProvider/useRooms/useRooms');
const mockUseRooms = useRooms as jest.Mock<any>;

describe('the useRoomName hook', () => {
  it('should return the first room when there are no live rooms', () => {
    mockUseRooms.mockReturnValue({ roomsState: { rooms: [] } });
    const { result } = renderHook(useRoomName);
    expect(result.current).toBe('captain');
  });
  it('should return the correct first available room name', () => {
    mockUseRooms.mockReturnValue({ roomsState: { rooms: [{ uniqueName: 'captain' }] } });
    const { result } = renderHook(useRoomName);
    expect(result.current).toBe('fuzzy');
  });
  it('should throw an error when there are no available room names', () => {
    mockUseRooms.mockReturnValue({
      roomsState: {
        rooms: [{ uniqueName: 'captain' }, { uniqueName: 'fuzzy' }, { uniqueName: 'boots' }],
      },
    });
    const { result } = renderHook(useRoomName);
    expect(result.error).not.toBeUndefined();
  });
});
