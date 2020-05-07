import React, { createContext, ReactNode } from 'react';

import { Callback } from 'types';
import useTrueViewportHeightUnit from 'hooks/useTrueViewportHeightUnit/useTrueViewportHeightUnit';
import useFlagWithToggle from 'hooks/useFlagWithToggle/useFlagWithToggle';

type UIStateContextType = {
  showChatModal: boolean;
  toggleChatModal: Callback;
  showMobileSidebar: boolean;
  toggleMobileSidebar: Callback;
  showMobileUi: boolean;
  toggleMobileUi: Callback;
  showMediaDevicesDialog: boolean;
  toggleMediaDevicesDialog: Callback;
};

export const UIStateContext = createContext<UIStateContextType>(null!);

type Props = {
  children: ReactNode;
};

const UIStateProvider = ({ children }: Props) => {
  useTrueViewportHeightUnit();

  const [showMobileSidebar, toggleMobileSidebar] = useFlagWithToggle();
  const [showMobileUi, toggleMobileUi] = useFlagWithToggle(true);
  const [showChatModal, toggleChatModal] = useFlagWithToggle();
  const [showMediaDevicesDialog, toggleMediaDevicesDialog] = useFlagWithToggle();

  return (
    <UIStateContext.Provider
      value={{
        showMobileSidebar,
        toggleMobileSidebar,
        showMobileUi,
        toggleMobileUi,
        showChatModal,
        toggleChatModal,
        showMediaDevicesDialog,
        toggleMediaDevicesDialog,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

export default UIStateProvider;
