import { useEffect, useRef, useState } from 'react';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import useInterval from 'use-interval';

export default function useLiveSupportDisplay() {
  const tidio = useRef<any>(null);
  const [isTidioAvailable, setIsTidioAvailable] = useState(false);

  useInterval(
    () => {
      if (window.tidioChatApi !== undefined) {
        tidio.current = window.tidioChatApi;
        setIsTidioAvailable(true);
      }
    },
    isTidioAvailable ? null : 100
  );

  const { showMobileSidebar, toggleMobileSidebar } = useUIState();
  const openSupportChat = () => {
    if (isTidioAvailable) {
      tidio.current.show();
      tidio.current.open();
      if (showMobileSidebar) toggleMobileSidebar();
    }
  };

  useEffect(() => {
    if (isTidioAvailable) {
      tidio.current.on('ready', () => tidio.current.hide());
    } else {
      document.addEventListener('tidioChat-ready', () => window.tidioChatApi.hide());
    }
  }, [isTidioAvailable]);

  useEffect(() => {
    if (isTidioAvailable) tidio.current.on('close', () => tidio.current.hide());
  }, [isTidioAvailable]);

  return openSupportChat;
}
