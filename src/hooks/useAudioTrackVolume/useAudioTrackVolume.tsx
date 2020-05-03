import { useEffect, useState } from 'react';
import { AudioTrack } from 'twilio-video';

import useAnalyserNode from 'hooks/useAnalyserNode/useAnalyserNode';

export default function useAudioTrackVolume(track: AudioTrack) {
  const [volume, setVolume] = useState(0);
  const audioData = useAnalyserNode(track);

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
