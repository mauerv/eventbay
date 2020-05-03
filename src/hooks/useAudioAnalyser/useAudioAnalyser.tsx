import { useState, useEffect } from 'react';
import { AudioTrack } from 'twilio-video';

export default function useAudioAnalyser(track: AudioTrack) {
  const [audioData, setAudioData] = useState(new Uint8Array(0));

  useEffect(() => {
    if (track) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const tempEl = track.attach();
      const stream = tempEl.srcObject as MediaStream;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const updateAudioData = setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);
        setAudioData(dataArray);
      }, 500);

      return () => {
        clearInterval(updateAudioData);
      };
    }
  }, [track]);

  return audioData;
}
