import React, { ChangeEvent } from 'react';

import useMediaDevices from 'hooks/useMediaDevices/useMediaDevices';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';

import MediaDeviceSelect from './MediaDeviceSelect/MediaDeviceSelect';
import FormGroup from '@material-ui/core/FormGroup';
import Dialog from '@material-ui/core/Dialog';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const MediaDevicesDialog = () => {
  const {
    mediaDevices,
    selectedAudioInput,
    setSelectedAudioInput,
    selectedAudioOutput,
    setSelectedAudioOutput,
    selectedVideoInput,
    setSelectedVideoInput,
  } = useMediaDevices();
  const { showMediaDevicesDialog, toggleMediaDevicesDialog } = useUIState();

  const handleVideoInputChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    setSelectedVideoInput(event.target.value);
  };

  const handleAudioInputChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    setSelectedAudioInput(event.target.value);
  };

  const handleAudioOutputChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    setSelectedAudioOutput(event.target.value);
  };

  return (
    <Dialog open={showMediaDevicesDialog} onClose={toggleMediaDevicesDialog}>
      <FormGroup>
        {mediaDevices && (
          <>
            <MediaDeviceSelect
              icon={<VideocamIcon fontSize="large" />}
              handleChange={handleVideoInputChange}
              selectedDevice={selectedVideoInput}
              availableDevices={mediaDevices.videoInput}
            />
            <MediaDeviceSelect
              icon={<MicIcon fontSize="large" />}
              handleChange={handleAudioInputChange}
              selectedDevice={selectedAudioInput}
              availableDevices={mediaDevices.audioInput}
            />
            <MediaDeviceSelect
              icon={<VolumeUpIcon fontSize="large" />}
              handleChange={handleAudioOutputChange}
              selectedDevice={selectedAudioOutput}
              availableDevices={mediaDevices.audioOutput}
            />
          </>
        )}
      </FormGroup>
    </Dialog>
  );
};

export default MediaDevicesDialog;
