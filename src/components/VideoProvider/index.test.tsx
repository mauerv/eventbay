import { EventEmitter } from 'events';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Room, TwilioError } from 'twilio-video';
import useLocalTracks from './useLocalTracks/useLocalTracks';
import useRoom from './useRoom/useRoom';
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors';
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed';
import useHandleOnDisconnect from './useHandleOnDisconnect/useHandleOnDisconnect';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import { VideoProvider } from './index';

const mockRoom = new EventEmitter() as Room;
const mockOnDisconnect = jest.fn();
jest.mock('./useRoom/useRoom', () =>
  jest.fn(() => ({ room: mockRoom, isConnecting: false, connect: () => {} }))
);
jest.mock('./useLocalTracks/useLocalTracks', () =>
  jest.fn(() => ({
    localTracks: ['mockTrack'],
    getLocalVideoTrack: jest.fn(),
    stopLocalTracks: jest.fn(),
  }))
);
jest.mock('./useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors');
jest.mock('./useHandleTrackPublicationFailed/useHandleTrackPublicationFailed');
jest.mock('./useHandleTrackPublicationFailed/useHandleTrackPublicationFailed');
jest.mock('./useHandleOnDisconnect/useHandleOnDisconnect');
jest.mock('hooks/useErrorTracking/useErrorTracking', () => () => ({ logError: jest.fn() }));

describe('the VideoProvider component', () => {
  it('should correctly return the Video Context object', async () => {
    const wrapper: React.FC = ({ children }) => (
      <VideoProvider onError={() => {}} onDisconnect={mockOnDisconnect}>
        {children}
      </VideoProvider>
    );
    const { result } = renderHook(useMediaContext, { wrapper });

    expect(result.current).toEqual({
      isConnecting: false,
      localTracks: ['mockTrack'],
      room: mockRoom,
      connect: expect.any(Function),
      onError: expect.any(Function),
      setRoomType: expect.any(Function),
      onDisconnect: mockOnDisconnect,
      getLocalVideoTrack: expect.any(Function),
      stopLocalTracks: expect.any(Function),
      roomType: null,
    });

    expect(useRoom).toHaveBeenCalledWith(['mockTrack'], expect.any(Function));
    expect(useLocalTracks).toHaveBeenCalled();
    expect(useHandleRoomDisconnectionErrors).toHaveBeenCalledWith(mockRoom, expect.any(Function));
    expect(useHandleTrackPublicationFailed).toHaveBeenCalledWith(mockRoom, expect.any(Function));
    expect(useHandleOnDisconnect).toHaveBeenCalledWith(mockRoom, mockOnDisconnect);
  });

  it('should call the onError function when there is an error', () => {
    const mockOnError = jest.fn();
    const wrapper: React.FC = ({ children }) => (
      <VideoProvider onError={mockOnError} onDisconnect={mockOnDisconnect}>
        {children}
      </VideoProvider>
    );
    const { result } = renderHook(useMediaContext, { wrapper });
    result.current.onError({} as TwilioError);
    expect(mockOnError).toHaveBeenCalledWith({});
  });
});
