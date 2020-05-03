import { useState, useEffect } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'twilio-video';
import useInterval from 'use-interval';

export default function useAudioAnalyser(track: LocalAudioTrack | RemoteAudioTrack) {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());
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
