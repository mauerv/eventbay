import { useEffect, useState } from 'react';
import Video, { LocalAudioTrack } from 'twilio-video';
import useMediaDevices from 'hooks/useMediaDevices/useMediaDevices';

const useLocalAudioTrack = () => {
  const [track, setTrack] = useState<LocalAudioTrack>();
  const { selectedAudioInput } = useMediaDevices();

  useEffect(() => {
    Video.createLocalAudioTrack({
      deviceId: selectedAudioInput,
    }).then(newTrack => {
      setTrack(newTrack);
    });
  }, [selectedAudioInput]);

  useEffect(() => {
    const handleStopped = () => setTrack(undefined);
    if (track) {
      track.on('stopped', handleStopped);
      return () => {
        track.off('stopped', handleStopped);
      };
    }
  }, [track]);

  return track;
};

export default function useLocalTracks() {
  const audioTrack = useLocalAudioTrack();

  const localTracks = [audioTrack].filter(track => track !== undefined) as LocalAudioTrack[];

  const stopLocalTracks = () => {
    localTracks.forEach(track => track.stop());
  };

  return { localTracks, stopLocalTracks };
}
