import { useState, useEffect } from 'react';
import { AudioTrack } from 'twilio-video';
import useInterval from 'use-interval';
import useAudioContext from 'hooks/useAudioContext/useAudioContext';

export default function useAnalyserNode(track: AudioTrack) {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const { audioContext } = useAudioContext();
  const [analyser] = useState(audioContext.createAnalyser());
  let buffer = new Uint8Array(analyser.frequencyBinCount);

  useEffect(() => {
    if (track) {
      const tempEl = track.attach();
      const stream = tempEl.srcObject as MediaStream;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
    }
  }, [track, analyser, audioContext]);

  useInterval(() => {
    analyser.getByteTimeDomainData(buffer);
    setAudioData(buffer);
  }, 500);

  return audioData;
}
