import React, { createContext, ReactNode, useState, useEffect } from 'react';
import Rollbar from 'rollbar';

import { Callback } from 'types';

type Context = { logError: Callback };

type Props = { children: ReactNode };

export const ErrorTrackingContext = createContext<Context>(null!);

export default function ErrorTrackingProvider({ children }: Props) {
  const [rollbar, setRollbar] = useState<Rollbar>(null!);

  useEffect(() => {
    const rollbarInstance = new Rollbar({
      accessToken: 'e3a4f6c5e48a4090b92418825a77113e',
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'production',
      },
    });

    setRollbar(rollbarInstance);
  }, []);

  const logError = (code: number, message: string) => {
    if (rollbar) {
      rollbar.error(message, { code });
    }
  };

  return (
    <ErrorTrackingContext.Provider value={{ logError }}>{children}</ErrorTrackingContext.Provider>
  );
}
