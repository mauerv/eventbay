import { renderHook } from '@testing-library/react-hooks';
import useAnalyserNode from './useAnalyserNode';

describe('the useAnalyserNode hook', () => {
  it('should return an empty Uint8Array when no track is passed as prop.', () => {
    const { result } = renderHook(useAnalyserNode);
    expect(result.current).toEqual(new Uint8Array(0));
  });
});
