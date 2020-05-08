import { useEffect } from 'react';

import useIsUserActive from 'components/Controls/useIsUserActive/useIsUserActive';

export default function useLiveChatToggle() {
  const isUserActive = useIsUserActive();

  useEffect(() => {
    if (window.tidioChatApi) {
      window.tidioChatApi.on('close', () => console.log('closing'));
      window.tidioChatApi.display(isUserActive);
    }
  }, [isUserActive]);
}
