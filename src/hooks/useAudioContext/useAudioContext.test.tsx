import { renderHook } from '@testing-library/react-hooks';

import useAudioContext from './useAudioContext';

describe('the useAudioContext hook', () => {
  it('should throw an error if used outside of an AudioContextProvider', () => {
    const { result } = renderHook(useAudioContext);
    expect(result.error.message).toBe(
      'useAudioContext must be used within an AudioContextProvider'
    );
  });
});
