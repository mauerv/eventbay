import { useState, useEffect } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'twilio-video';

type trackType = LocalAudioTrack | RemoteAudioTrack;

export default function useAudioAnalyser(track: trackType) {
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

      setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);
        setAudioData(dataArray);
      }, 500);
    }
  }, [track]);

  return audioData;
}
