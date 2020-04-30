import React, { FunctionComponent } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import useErrorTracking from './useErrorTracking';
import ErrorTrackingProvider from 'components/ErrorTrackingProvider/ErrorTrackingProvider';

const wrapper: FunctionComponent = ({ children }) => (
  <ErrorTrackingProvider>{children}</ErrorTrackingProvider>
);

describe('the useErrorTracking hook', () => {
  it('should throw an error if used outside of an ErrorTrackingProvider', () => {
    const { result } = renderHook(useErrorTracking);
    expect(result.error.message).toBe(
      'useErrorTracking must be used within a ErrorTrackingProvider'
    );
  });
  it('should not throw an error if used within an ErrorTrackingProvider', () => {
    const { result } = renderHook(useErrorTracking, { wrapper });
    expect(result.error).toBeUndefined();
  });
  it('correctly returns the ErrorTrackingContext values', () => {
    const { result } = renderHook(useErrorTracking, { wrapper });
    expect(result.current).toEqual({ logError: expect.any(Function) });
  });
});
