import { useContext } from 'react';
import { MediaContext } from 'components/MediaProvider/MediaProvider';

export default function useMediaContext() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
}
