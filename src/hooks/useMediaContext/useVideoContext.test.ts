import useMediaContext from './useMediaContext';
import { renderHook } from '@testing-library/react-hooks';

describe('the useMediaContext hook', () => {
  it('should throw an error if used outside of the VideoProvider', () => {
    const { result } = renderHook(useMediaContext);
    expect(result.error.message).toBe('useMediaContext must be used within a VideoProvider');
  });
});
