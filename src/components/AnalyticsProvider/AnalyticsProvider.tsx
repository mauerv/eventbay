import React, { useEffect, createContext, ReactNode } from 'react';
import Amplitude from 'amplitude-js';

import { Callback } from 'types';
import { useAppState } from 'state';

type Context = {
  logEvent: Callback;
};

type Props = {
  children: ReactNode;
};

export const AnalyticsContext = createContext<Context>(null!);

export default function AnalyticsProvider({ children }: Props) {
  const { nick } = useAppState();

  useEffect(() => {
    Amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_ID as string);
  }, []);

  useEffect(() => {
    if (nick !== '') {
      const identify = new Amplitude.Identify().set('nick', nick);
      Amplitude.identify(identify);
    }
  }, [nick]);

  const logEvent = (event: string, data?: any, callback?: Callback) => {
    Amplitude.getInstance().logEvent(event, data, callback);
  };

  return <AnalyticsContext.Provider value={{ logEvent }}>{children}</AnalyticsContext.Provider>;
}
