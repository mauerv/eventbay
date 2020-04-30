import { useState, useEffect } from 'react';

interface IMediaDevices {
  audioInput: MediaDeviceInfo[];
  audioOutput: MediaDeviceInfo[];
  videoInput: MediaDeviceInfo[];
}

export const detectDeviceType = (device: MediaDeviceInfo) => {
  const [, type, direction] = device.kind.match(/(\w+)(input|output)/i) as string[];
  return [type, direction];
};

export default function useAvailableMediaDevices() {
  const [mediaDevices, setMediaDevices] = useState<IMediaDevices>(null!);

  const updateMediaDevices = () => {
    let devices: IMediaDevices = {
      audioInput: [],
      audioOutput: [],
      videoInput: [],
    };

    navigator.mediaDevices.enumerateDevices().then(devicesInfo => {
      devicesInfo.forEach(deviceInfo => {
        const [type, direction] = detectDeviceType(deviceInfo);
        if (type === 'audio' && direction === 'input') {
          devices.audioInput.push(deviceInfo);
        } else if (type === 'audio') {
          devices.audioOutput.push(deviceInfo);
        } else if (type === 'video' && direction === 'input') {
          devices.videoInput.push(deviceInfo);
        }
      });

      setMediaDevices(devices);
    });
  };

  useEffect(() => {
    updateMediaDevices();

    navigator.mediaDevices.addEventListener('devicechange', updateMediaDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateMediaDevices);
    };
  }, []);

  return { mediaDevices, updateMediaDevices };
}
