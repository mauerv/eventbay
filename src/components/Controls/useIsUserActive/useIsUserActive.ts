import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import useIsMounted from 'hooks/useIsMounted/useIsMounted';

export default function useIsUserActive() {
  const [isUserActive, setIsUserActive] = useState(true);
  const timeoutIDRef = useRef(0);
  const isMounted = useIsMounted();

  useEffect(() => {
    const handleUserActivity = throttle(() => {
      if (isMounted.current) {
        setIsUserActive(true);
        clearTimeout(timeoutIDRef.current);
        const timeoutID = window.setTimeout(() => setIsUserActive(false), 5000);
        timeoutIDRef.current = timeoutID;
      }
    }, 500);

    handleUserActivity();

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearTimeout(timeoutIDRef.current);
      isMounted.current = false;
    };
  }, [isMounted]);

  return isUserActive;
}
