import { useCallback, useEffect, useState } from 'react';
import Video, { LocalVideoTrack, LocalAudioTrack } from 'twilio-video';
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

  return track;
}

export function useLocalVideoTrack() {
  const [track, setTrack] = useState<LocalVideoTrack>();
  const { selectedVideoInput } = useMediaDevices();

  const getLocalVideoTrack = useCallback(
    () =>
      Video.createLocalVideoTrack({
        frameRate: 24,
        height: 720,
        width: 1280,
        name: 'camera',
        deviceId: selectedVideoInput,
      }).then(newTrack => {
        setTrack(newTrack);
        return newTrack;
      }),
    [selectedVideoInput]
  );

  useEffect(() => {
    // We get a new local video track when the app loads.
    getLocalVideoTrack();
  }, [getLocalVideoTrack]);

  useEffect(() => {
    const handleStopped = () => setTrack(undefined);
    if (track) {
      track.on('stopped', handleStopped);
      return () => {
        track.off('stopped', handleStopped);
      };
    }
  }, [track]);

  return [track, getLocalVideoTrack] as const;
}

export default function useLocalTracks() {
  const audioTrack = useLocalAudioTrack();
  const [videoTrack, getLocalVideoTrack] = useLocalVideoTrack();

  const localTracks = [audioTrack, videoTrack].filter(track => track !== undefined) as (
    | LocalAudioTrack
    | LocalVideoTrack
  )[];

  const stopLocalTracks = () => {
    localTracks.forEach(track => track.stop());
  };

  return { localTracks, getLocalVideoTrack, stopLocalTracks };
}
