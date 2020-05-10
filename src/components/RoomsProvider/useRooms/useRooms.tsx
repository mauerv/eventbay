import { useContext } from 'react';

import { RoomsContext } from '../RoomsProvider';

export default function useRooms() {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useRooms must be used within a RoomsProvider');
  }
  return context;
}
