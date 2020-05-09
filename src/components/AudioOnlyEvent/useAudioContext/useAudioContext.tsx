import { useContext } from 'react';
import { AudioContext } from 'components/AudioOnlyEvent/AudioProvider';

export default function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioPropvider');
  }
  return context;
}
