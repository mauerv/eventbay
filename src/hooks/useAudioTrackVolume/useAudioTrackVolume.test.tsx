import { renderHook } from '@testing-library/react-hooks';
import useAudioTrackVolume from './useAudioTrackVolume';
import useAnalyserNode from 'hooks/useAnalyserNode/useAnalyserNode';

jest.mock('hooks/useAnalyserNode/useAnalyserNode');

const mockUseAnalyserNode = useAnalyserNode as jest.Mock<any>;

describe('the useAudioTrackVolume hook', () => {
  it('should return a volume of 0 initially', () => {
    mockUseAnalyserNode.mockReturnValueOnce(new Uint8Array(0));
    const { result } = renderHook(useAudioTrackVolume);
    expect(result.current).toBe(0);
  });
  it('should return the correct maximum volume', () => {
    mockUseAnalyserNode.mockReturnValue([0, 160, 25, 255]);
    const { result } = renderHook(useAudioTrackVolume);
    expect(result.current).toBe(1);
  });
  it('should return the correct minimum volume', () => {
    mockUseAnalyserNode.mockReturnValue([128, 128]);
    const { result } = renderHook(useAudioTrackVolume);
    expect(result.current).toBe(0);
  });
});
