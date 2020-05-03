import React, { FunctionComponent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useAnalyserNode from './useAnalyserNode';
import AudioContextProvider from 'components/AudioContextProvider/AudioContextProvider';

describe('the useAnalyserNode hook', () => {
  it('should return an empty Uint8Array when no track is passed as prop.', () => {
    const wrapper: FunctionComponent = ({ children }) => (
      <AudioContextProvider>{children}</AudioContextProvider>
    );
    const { result } = renderHook(useAnalyserNode, { wrapper });
    expect(result.current).toEqual(new Uint8Array(0));
  });
});
