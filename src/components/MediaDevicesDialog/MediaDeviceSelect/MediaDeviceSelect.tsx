import React, { ReactNode } from 'react';
import { Callback } from 'types';
import { FormControl, MediaSelect, MediaIcon } from './styles';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  icon: ReactNode;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: string;
  handleChange: Callback;
};

const MediaDeviceSelect = ({ icon, availableDevices, selectedDevice, handleChange }: Props) => {
  const content =
    availableDevices.length === 0 ? (
      <MediaSelect value="default" onChange={handleChange}>
        <MenuItem value="default" key="default">
          Default
        </MenuItem>
      </MediaSelect>
    ) : (
      <MediaSelect value={selectedDevice} onChange={handleChange}>
        {availableDevices.map(device => (
          <MenuItem value={device.deviceId} key={device.deviceId}>
            {device.label}
          </MenuItem>
        ))}
      </MediaSelect>
    );

  return (
    <FormControl>
      <MediaIcon>{icon}</MediaIcon>
      {content}
    </FormControl>
  );
};

export default MediaDeviceSelect;
