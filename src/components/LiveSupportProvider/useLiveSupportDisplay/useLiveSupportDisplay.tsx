import { useEffect } from 'react';

export default function useLiveSupportDisplay() {
  const openSupportChat = () => {
    if (window.tidioChatApi) {
      window.tidioChatApi.show();
      window.tidioChatApi.open();
    }
  };

  useEffect(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.on('ready', () => window.tidioChatApi.hide());
    } else {
      document.addEventListener('tidioChat-ready', () => window.tidioChatApi.hide());
    }
  }, []);

  useEffect(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.on('close', () => window.tidioChatApi.hide());
    }
  }, []);

  return openSupportChat;
}
