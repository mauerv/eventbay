import { act, renderHook } from '@testing-library/react-hooks';
import Video from 'twilio-video';
import { EventEmitter } from 'events';
import useMediaDevices from 'hooks/useMediaDevices/useMediaDevices';

import useLocalTracks from './useLocalTracks';

jest.mock('hooks/useMediaDevices/useMediaDevices');

const mockUseMediaDevices = useMediaDevices as jest.Mock<any>;

describe('the useLocalTracks hook', () => {
  beforeEach(() => {
    mockUseMediaDevices.mockReturnValue({
      selectedAudioInput: 'default',
      selectedVideoInput: 'default',
    });
  });
  it('should return an array of tracks and two functions', async () => {
    const { result, waitForNextUpdate } = renderHook(useLocalTracks);
    expect(result.current.localTracks).toEqual([]);
    await waitForNextUpdate();
    expect(result.current.localTracks).toEqual([
      expect.any(EventEmitter),
      expect.any(EventEmitter),
    ]);
    expect(result.current.getLocalVideoTrack).toEqual(expect.any(Function));
    expect(result.current.stopLocalTracks).toEqual(expect.any(Function));
  });

  it('should be called with the correct arguments', async () => {
    const { waitForNextUpdate } = renderHook(useLocalTracks);
    await waitForNextUpdate();
    expect(Video.createLocalAudioTrack).toHaveBeenCalledWith({
      deviceId: 'default',
    });
    expect(Video.createLocalVideoTrack).toHaveBeenCalledWith({
      deviceId: 'default',
      frameRate: 24,
      height: 720,
      width: 1280,
      name: 'camera',
    });
  });

  it('should respond to "stopped" events from the local video track', async () => {
    const { result, waitForNextUpdate } = renderHook(useLocalTracks);
    await waitForNextUpdate();
    expect(result.current.localTracks).toEqual([
      expect.any(EventEmitter),
      expect.any(EventEmitter),
    ]);
    act(() => {
      result.current.localTracks[0].emit('stopped');
      result.current.localTracks[1].emit('stopped');
    });
    expect(result.current.localTracks).toEqual([]);
  });

  it('should update the audio track when updating selectedAudioInput', async () => {
    const { waitForNextUpdate, rerender } = renderHook(useLocalTracks);

    await waitForNextUpdate();
    mockUseMediaDevices.mockReturnValue({
      selectedAudioInput: 'test',
      selectedVideoInput: 'default',
    });
    rerender();
    await waitForNextUpdate();

    expect(Video.createLocalAudioTrack).toHaveBeenCalledWith({
      deviceId: 'test',
    });
  });

  it('should update the video track when updating selectedVideoInput', async () => {
    const { waitForNextUpdate, rerender } = renderHook(useLocalTracks);

    await waitForNextUpdate();
    mockUseMediaDevices.mockReturnValue({
      selectedAudioInput: 'default',
      selectedVideoInput: 'test',
    });
    rerender();
    await waitForNextUpdate();

    expect(Video.createLocalVideoTrack).toHaveBeenCalledWith({
      deviceId: 'test',
      frameRate: 24,
      height: 720,
      width: 1280,
      name: 'camera',
    });
  });
});
