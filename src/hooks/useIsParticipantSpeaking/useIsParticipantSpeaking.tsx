import { useState, useEffect } from 'react';
import useAudioTrackVolume from 'hooks/useAudioTrackVolume/useAudioTrackVolume';
import { AudioTrack } from 'twilio-video';

export default function useIsParticipantSpeaking(track: AudioTrack) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const volume = useAudioTrackVolume(track);
  const threshold = 0.05;

  useEffect(() => {
    setIsSpeaking(volume > threshold);
  }, [volume]);

  return isSpeaking;
}
