import React, { createContext, useContext, ReactNode } from 'react';

import { Callback } from 'types';
import useLiveSupportDisplay from './useLiveSupportDisplay/useLiveSupportDisplay';

type Context = {
  openSupportChat: Callback;
};

type Props = {
  children: ReactNode;
};

export const LiveSupportContext = createContext<Context>(null!);

export default function LiveSupportProvider({ children }: Props) {
  const openSupportChat = useLiveSupportDisplay();

  return (
    <LiveSupportContext.Provider value={{ openSupportChat }}>
      {children}
    </LiveSupportContext.Provider>
  );
}

export const useLiveSupportContext = () => {
  const context = useContext(LiveSupportContext);
  if (!context) {
    throw new Error('useLiveSupportContext must be used within a LiveSupportProvider');
  }
  return context;
};
