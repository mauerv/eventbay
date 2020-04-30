import { useContext } from 'react';
import { MediaDevicesContext } from 'components/MediaDevicesProvider/MediaDevicesProvider';

export default function useMediaDevices() {
  const context = useContext(MediaDevicesContext);
  if (!context) {
    throw new Error('useMediaDevices must be used within a MediaDevicesProvider');
  }
  return context;
}
