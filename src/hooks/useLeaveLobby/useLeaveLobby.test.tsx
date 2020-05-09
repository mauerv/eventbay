import { act, renderHook } from '@testing-library/react-hooks';
import { useAppState } from 'state';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';

import useLeaveLobby from './useLeaveLobby';

jest.mock('hooks/useAnalytics/useAnalytics');
jest.mock('state');
jest.mock('hooks/useMediaContext/useMediaContext');

const mockuseMediaContext = useMediaContext as jest.Mock<any>;
const mockUseAppState = useAppState as jest.Mock<any>;
const mockUseAnalytics = useAnalytics as jest.Mock<any>;

const mockSetNick = jest.fn();
const mockLogEvent = jest.fn();
const mockDisconnect = jest.fn();
const mockStopLocalTracks = jest.fn();

describe('the useLeaveLobby hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockuseMediaContext.mockReturnValue({ room: {}, stopLocalTracks: mockStopLocalTracks });
    mockUseAppState.mockReturnValue({ setNick: mockSetNick });
    mockUseAnalytics.mockReturnValue({ logEvent: mockLogEvent });
  });
  it('should erase the user nick', () => {
    const { result } = renderHook(useLeaveLobby);
    act(() => result.current());

    expect(mockSetNick).toHaveBeenCalledWith('');
  });

  it('should stop local tracks', () => {
    const { result } = renderHook(useLeaveLobby);
    act(() => result.current());

    expect(mockStopLocalTracks).toHaveBeenCalledTimes(1);
  });

  it('should disconnect from room if connected.', () => {
    mockuseMediaContext.mockReturnValue({
      room: { sid: 'exists', disconnect: mockDisconnect },
      stopLocalTracks: jest.fn(),
    });

    const { result } = renderHook(useLeaveLobby);
    act(() => result.current());

    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });

  it('should not try to disconnect from room if there is no connected room', () => {
    mockuseMediaContext.mockReturnValue({
      room: { disconnect: mockDisconnect },
      stopLocalTracks: jest.fn(),
    });

    const { result } = renderHook(useLeaveLobby);
    act(() => result.current());

    expect(mockDisconnect).not.toHaveBeenCalled();
  });

  it("should log a 'LOBBY_LEAVE' event", () => {
    const { result } = renderHook(useLeaveLobby);
    act(() => result.current());

    expect(mockLogEvent).toHaveBeenCalledWith('LOBBY_LEAVE');
  });
});
