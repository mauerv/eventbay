import { useEffect, useRef } from 'react';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';

export default function useLiveSupportDisplay() {
  const tidio = useRef(window.tidioChatApi);
  const { showMobileSidebar, toggleMobileSidebar } = useUIState();

  const openSupportChat = () => {
    if (tidio.current) {
      tidio.current.show();
      tidio.current.open();
      if (showMobileSidebar) toggleMobileSidebar();
    }
  };

  useEffect(() => {
    if (tidio.current) {
      tidio.current.on('ready', () => tidio.current.hide());
    } else {
      document.addEventListener('tidioChat-ready', () => window.tidioChatApi.hide());
    }
  }, []);

  useEffect(() => {
    if (tidio.current) tidio.current.on('close', () => tidio.current.hide());
  }, []);

  return openSupportChat;
}
