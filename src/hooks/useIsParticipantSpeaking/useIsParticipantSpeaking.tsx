import { useState, useEffect } from 'react';
import useAudioTrackVolume from 'hooks/useAudioTrackVolume/useAudioTrackVolume';
import { LocalAudioTrack, RemoteAudioTrack } from 'twilio-video';

export default function useIsParticipantSpeaking(track: LocalAudioTrack | RemoteAudioTrack) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const volume = useAudioTrackVolume(track);
  const min = 0.05;

  useEffect(() => {
    setIsSpeaking(volume > min);
  }, [volume]);

  return isSpeaking;
}
