import React, { FunctionComponent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useChatMessages from './useChatMessages';
import UIStateProvider from 'components/UIStateProvider/UIStateProvider';

describe('the useChatMessages hook', () => {
  let roomName = 'testRoom';

  it('should initialize with an empty array', () => {
    const wrapper: FunctionComponent = ({ children }) => (
      <UIStateProvider>{children}</UIStateProvider>
    );
    const { result } = renderHook(() => useChatMessages(roomName), { wrapper });
    expect(result.current.messages).toEqual([]);
  });

  it('should throw error when outside of UIStateContext', () => {
    const { result } = renderHook(() => useChatMessages(roomName));
    expect(result.error).not.toBeUndefined();
  });
});
