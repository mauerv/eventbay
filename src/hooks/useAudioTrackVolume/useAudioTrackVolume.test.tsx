import { renderHook } from '@testing-library/react-hooks';
import useAudioTrackVolume from './useAudioTrackVolume';
import useAudioAnalyser from 'hooks/useAudioAnalyser/useAudioAnalyser';

jest.mock('hooks/useAudioAnalyser/useAudioAnalyser');

const mockUseAudioAnalyser = useAudioAnalyser as jest.Mock<any>;

describe('the useAudioTrackVolume hook', () => {
  it('should return a volume of 0 initially', () => {
    mockUseAudioAnalyser.mockReturnValueOnce(new Uint8Array(0));
    const { result } = renderHook(useAudioTrackVolume);
    expect(result.current).toBe(0);
  });
  it('should return the correct maximum volume', () => {
    mockUseAudioAnalyser.mockReturnValue([0, 255]);
    const { result } = renderHook(useAudioTrackVolume);
    expect(result.current).toBe(1);
  });
  it('should return the correct minimum volume', () => {
    mockUseAudioAnalyser.mockReturnValue([128, 128]);
    const { result } = renderHook(useAudioTrackVolume);
    expect(result.current).toBe(0);
  });
});
