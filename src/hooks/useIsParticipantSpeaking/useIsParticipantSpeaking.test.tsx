import { renderHook } from '@testing-library/react-hooks';

import useIsParticipantSpeaking from './useIsParticipantSpeaking';
import useAudioTrackVolume from 'hooks/useAudioTrackVolume/useAudioTrackVolume';

jest.mock('hooks/useAudioTrackVolume/useAudioTrackVolume');
const mockUseAudioTrackVolume = useAudioTrackVolume as jest.Mock<any>;

describe('the useIsParticipantSpeaking hook', () => {
  it('should return false initially', () => {
    const { result } = renderHook(useIsParticipantSpeaking);
    expect(result.current).toBe(false);
  });
  it('should return false with a volume of 0', () => {
    mockUseAudioTrackVolume.mockReturnValue(0);
    const { result } = renderHook(useIsParticipantSpeaking);
    expect(result.current).toBe(false);
  });
  it('should return true with a volume of 1', () => {
    mockUseAudioTrackVolume.mockReturnValue(1);
    const { result } = renderHook(useIsParticipantSpeaking);
    expect(result.current).toBe(true);
  });
});
