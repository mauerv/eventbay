import React from 'react';
import styled from 'styled-components';

import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import useMediaDevices from 'hooks/useMediaDevices/useMediaDevices';

import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

const StyledSettingsIcon = styled(SettingsIcon)`
  background-color: ${props => props.theme.palette.primary.light};
  padding: 3px;
  border-radius: 5px;
  color: white;
`;

const ToggleDeviceDialog = () => {
  const { toggleMediaDevicesDialog } = useUIState();
  const { updateMediaDevices } = useMediaDevices();

  const handleClick = () => {
    updateMediaDevices();
    toggleMediaDevicesDialog();
  };

  return (
    <IconButton onClick={handleClick}>
      <StyledSettingsIcon fontSize="large" />
    </IconButton>
  );
};

export default ToggleDeviceDialog;
