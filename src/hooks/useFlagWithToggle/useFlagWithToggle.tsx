import { useState, useCallback } from 'react';
import { Callback } from 'types';

export default function useFlagWithToggle(initialState = false): [boolean, Callback] {
  const [flag, setFlag] = useState(initialState);

  const toggleFlag = useCallback(() => {
    setFlag(!flag);
  }, [flag]);

  return [flag, toggleFlag];
}
