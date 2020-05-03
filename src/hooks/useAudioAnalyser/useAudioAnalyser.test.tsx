import { renderHook } from '@testing-library/react-hooks';
import useAudioAnalyser from './useAudioAnalyser';

describe('the useAudioAnalyser hook', () => {
  it('should return an empty Uint8Array when no track is passed as prop.', () => {
    const { result } = renderHook(useAudioAnalyser);
    expect(result.current).toEqual(new Uint8Array(0));
  });
});
