import { useEffect, useState } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'twilio-video';

import useAudioAnalyser from 'hooks/useAudioAnalyser/useAudioAnalyser';

type trackType = LocalAudioTrack | RemoteAudioTrack;

export default function useAudioTrackVolume(track: trackType) {
  const [volume, setVolume] = useState(0);
  const audioData = useAudioAnalyser(track);

  useEffect(() => {
    var min = 128;
    var max = 128;

    for (var i = 0; i < audioData.length; i++) {
      var sample = audioData[i];
      if (sample < min) min = sample;
      else if (sample > max) max = sample;
    }

    setVolume((max - min) / 255);
  }, [audioData]);

  return volume;
}
