import { act, renderHook } from '@testing-library/react-hooks';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useCanJoinRooms from './useCanJoinRooms/useCanJoinRooms';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import { useAppState } from 'state';

import useJoinRoom from './useJoinRoom';

jest.mock('hooks/useAnalytics/useAnalytics');
jest.mock('hooks/useMediaContext/useMediaContext');
jest.mock('hooks/useRoomState/useRoomState');
jest.mock('./useCanJoinRooms/useCanJoinRooms');
jest.mock('hooks/useRoomState/useRoomState');
jest.mock('hooks/useMediaContext/useMediaContext');
jest.mock('state');

const _useAnalytics = useAnalytics as jest.Mock<any>;
const _useCanJoinRooms = useCanJoinRooms as jest.Mock<any>;
const _useRoomState = useRoomState as jest.Mock<any>;
const _useMediaContext = useMediaContext as jest.Mock<any>;
const _useAppState = useAppState as jest.Mock<any>;

const _logEvent = jest.fn();
const _disconnect = jest.fn();
const _getToken = jest.fn();

describe('the useJoinRoom hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    _useAnalytics.mockReturnValue({ logEvent: _logEvent });
    _useCanJoinRooms.mockReturnValue(true);
    _useMediaContext.mockReturnValue({
      room: { disconnect: _disconnect },
      setRoomType: jest.fn(),
      connect: jest.fn(),
    });
    _useAppState.mockReturnValue({ nick: 'testNick', getToken: _getToken });
  });
  describe('analytics', () => {
    const testRoomType = 'video-p2p';
    it('should not fire any event if canJoinRooms is false', () => {
      _useCanJoinRooms.mockReturnValue(false);

      renderHook(useJoinRoom);

      expect(_logEvent).not.toHaveBeenCalled();
    });
    it('should fire ROOM_SWITCH with the correct roomType when already connected to a room.', () => {
      _useRoomState.mockReturnValue('connected');

      const { result } = renderHook(useJoinRoom);
      act(() => {
        result.current.joinRoom('testRoom', testRoomType);
      });

      expect(_logEvent).toHaveBeenCalledWith('ROOM_SWITCH', { roomType: testRoomType });
    });
    it('should fire ROOM_JOIN event the correct roomType when not connected to a room.', () => {
      _useRoomState.mockReturnValue('disconnected');

      const { result } = renderHook(useJoinRoom);
      act(() => {
        result.current.joinRoom('testRoom', testRoomType);
      });

      expect(_logEvent).toHaveBeenCalledWith('ROOM_JOIN', { roomType: testRoomType });
    });
  });
});
