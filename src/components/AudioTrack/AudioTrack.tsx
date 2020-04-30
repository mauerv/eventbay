import React, { useEffect, useRef } from 'react';
import { AudioTrack as IAudioTrack } from 'twilio-video';
import useMediaDevices from 'hooks/useMediaDevices/useMediaDevices';

interface AudioTrackProps {
  track: IAudioTrack;
}

export default function AudioTrack({ track }: AudioTrackProps) {
  const { selectedAudioOutput } = useMediaDevices();
  const ref = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    const el: HTMLMediaElement = ref.current;
    track.attach(el);
    // @ts-ignore TODO: Make this more sturdy.
    if (el.setSinkId) el.setSinkId(selectedAudioOutput);
    return () => {
      track.detach(el);
    };
  }, [track, selectedAudioOutput]);

  return <audio ref={ref} />;
}
