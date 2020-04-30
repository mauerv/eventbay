import React, { FunctionComponent } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import useAnalytics from './useAnalytics';
import AnalyticsProvider from 'components/AnalyticsProvider/AnalyticsProvider';
import AppStateProvider from 'state';

const wrapper: FunctionComponent = ({ children }) => (
  <AppStateProvider>
    <AnalyticsProvider>{children}</AnalyticsProvider>
  </AppStateProvider>
);

describe('the useAnalytics hook', () => {
  it('should throw an error if used outside of an AnalyticsProvider', () => {
    const { result } = renderHook(useAnalytics);
    expect(result.error.message).toBe('useAnalytics must be used within an AnalyticsProvider');
  });
  it('should not throw an error if used within an AnalyticsProvider', () => {
    const { result } = renderHook(useAnalytics, { wrapper });
    expect(result.error).toBeUndefined();
  });
  it('correctly returns the AnalyticsContext values', () => {
    const { result } = renderHook(useAnalytics, { wrapper });
    expect(result.current).toEqual({ logEvent: expect.any(Function) });
  });
});
