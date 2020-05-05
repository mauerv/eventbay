import { renderHook } from '@testing-library/react-hooks';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import { useAppState } from 'state';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';

import useCanJoinRooms from './useCanJoinRooms';

jest.mock('state');
jest.mock('hooks/useVideoContext/useVideoContext');
jest.mock('components/RoomsProvider/useRooms/useRooms');

const _useAppState = useAppState as jest.Mock<any>;
const _useVideoContext = useVideoContext as jest.Mock<any>;
const _useRooms = useRooms as jest.Mock<any>;

describe('the useCanJoinRooms hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    _useAppState.mockReturnValue({ isFetching: false });
    _useRooms.mockReturnValue({ roomsState: { isFetching: false } });
    _useVideoContext.mockReturnValue({ isConnecting: false });
  });
  it('should return true if you are not fetching or connecting.', () => {
    const { result } = renderHook(useCanJoinRooms);

    expect(result.current).toBe(true);
  });
  it('should return false if you are fetching a token', () => {
    _useAppState.mockReturnValue({ isFetching: true });

    const { result } = renderHook(useCanJoinRooms);

    expect(result.current).toBe(false);
  });
  it('should return false if you are fetching the live rooms', () => {
    _useRooms.mockReturnValue({ roomsState: { isFetching: true } });

    const { result } = renderHook(useCanJoinRooms);

    expect(result.current).toBe(false);
  });
  it('should return false if you are already joining a room', () => {
    _useVideoContext.mockReturnValue({ isConnecting: true });

    const { result } = renderHook(useCanJoinRooms);

    expect(result.current).toBe(false);
  });
});
