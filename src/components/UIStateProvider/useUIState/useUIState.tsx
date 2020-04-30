import { useContext } from 'react';
import { UIStateContext } from '../UIStateProvider';

export default function useUIState() {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
}
