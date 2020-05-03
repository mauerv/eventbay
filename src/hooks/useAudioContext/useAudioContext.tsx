import { useContext } from 'react';
import { AudioContextContext } from 'components/AudioContextProvider/AudioContextProvider';

export default function useAudioContext() {
  const context = useContext(AudioContextContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioContextProvider');
  }
  return context;
}
