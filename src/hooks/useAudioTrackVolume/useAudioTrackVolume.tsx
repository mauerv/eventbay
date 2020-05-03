import { useEffect, useState } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'twilio-video';

import useAudioAnalyser from 'hooks/useAudioAnalyser/useAudioAnalyser';

export default function useAudioTrackVolume(track: LocalAudioTrack | RemoteAudioTrack) {
  const [volume, setVolume] = useState(0);
  const audioData = useAudioAnalyser(track);

  useEffect(() => {
    let min = 128;
    let max = 128;

    for (let i = 0; i < audioData.length; i++) {
      const sample = audioData[i];
      if (sample < min) min = sample;
      else if (sample > max) max = sample;
    }
    const difference = max - min;
    setVolume(difference / 255);
  }, [audioData]);

  return volume;
}
