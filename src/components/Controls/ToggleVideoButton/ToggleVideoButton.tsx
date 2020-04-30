import React from 'react';
import styled from 'styled-components';

import Tooltip from '@material-ui/core/Tooltip';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import MUIFab from '@material-ui/core/Fab';

import useLocalVideoToggle from 'hooks/useLocalVideoToggle/useLocalVideoToggle';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';

export const Fab = styled(MUIFab)`
  margin: ${props => props.theme.spacing(0.5)}px;
  @media (min-width: 600px) {
    margin: ${props => props.theme.spacing(1)}px;
  }
`;

export default function ToggleVideoButton(props: { disabled?: boolean }) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const { logEvent } = useAnalytics();
  const enabledTitle = useFormatMessage({ id: 'controls.videoOff', defaultMessage: 'Mute Video' });
  const disabledTitle = useFormatMessage({
    id: 'controls.videoOn',
    defaultMessage: 'Unmute Video',
  });

  const handleClick = () => {
    isVideoEnabled ? logEvent('VIDEO_DISABLE') : logEvent('VIDEO_ENABLE');

    toggleVideoEnabled();
  };

  return (
    <Tooltip
      title={isVideoEnabled ? enabledTitle : disabledTitle}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab onClick={handleClick} disabled={props.disabled} data-test="toggle-video-button">
        {isVideoEnabled ? <Videocam /> : <VideocamOff />}
      </Fab>
    </Tooltip>
  );
}
