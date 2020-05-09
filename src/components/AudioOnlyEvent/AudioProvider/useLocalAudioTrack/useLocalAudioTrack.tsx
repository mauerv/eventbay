import { useEffect, useState } from 'react';
import Video, { LocalAudioTrack } from 'twilio-video';
import useMediaDevices from 'hooks/useMediaDevices/useMediaDevices';

export function useLocalAudioTrack() {
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

  const stopLocalAudioTrack = () => {
    if (track) track.stop();
  };

  return { localAudioTrack: track, stopLocalAudioTrack };
}
