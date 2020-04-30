import React, { createContext, useState, ReactNode, useEffect } from 'react';

import useAvailableMediaDevices from './useAvailableMediaDevices/useAvailableMediaDevices';
import { Callback } from 'types';

type MediaDevices = {
  audioInput: MediaDeviceInfo[];
  audioOutput: MediaDeviceInfo[];
  videoInput: MediaDeviceInfo[];
};

type Context = {
  selectedAudioInput: string;
  setSelectedAudioInput: Callback;
  selectedAudioOutput: string;
  setSelectedAudioOutput: Callback;
  selectedVideoInput: string;
  setSelectedVideoInput: Callback;
  mediaDevices: MediaDevices;
  updateMediaDevices: Callback;
};

type Props = {
  children: ReactNode;
};

export const MediaDevicesContext = createContext<Context>(null!);

const MediaDevicesProvider = ({ children }: Props) => {
  const { mediaDevices, updateMediaDevices } = useAvailableMediaDevices();

  const [selectedAudioInput, setSelectedAudioInput] = useState<string>(null!);
  const [selectedAudioOutput, setSelectedAudioOutput] = useState<string>(null!);
  const [selectedVideoInput, setSelectedVideoInput] = useState<string>(null!);

  useEffect(() => {
    if (mediaDevices) {
      if (mediaDevices.audioOutput.length !== 0) {
        if (selectedAudioOutput === null) {
          setSelectedAudioOutput(mediaDevices.audioOutput[0].deviceId);
        }
      }
      if (mediaDevices.audioInput.length !== 0) {
        if (selectedAudioInput === null) {
          setSelectedAudioInput(mediaDevices.audioInput[0].deviceId);
        }
      }
      if (mediaDevices.videoInput.length !== 0) {
        if (selectedVideoInput === null) {
          setSelectedVideoInput(mediaDevices.videoInput[0].deviceId);
        }
      }
    }
  }, [mediaDevices, selectedAudioOutput, selectedAudioInput, selectedVideoInput]);

  return (
    <MediaDevicesContext.Provider
      value={{
        selectedAudioInput,
        setSelectedAudioInput,
        selectedAudioOutput,
        setSelectedAudioOutput,
        selectedVideoInput,
        setSelectedVideoInput,
        mediaDevices,
        updateMediaDevices,
      }}
    >
      {children}
    </MediaDevicesContext.Provider>
  );
};

export default MediaDevicesProvider;
