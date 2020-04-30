import React from 'react';
import styled from 'styled-components';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Tooltip from '@material-ui/core/Tooltip';
import MUIFab from '@material-ui/core/Fab';

import useLocalAudioToggle from 'hooks/useLocalAudioToggle/useLocalAudioToggle';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';

export const Fab = styled(MUIFab)`
  margin: ${props => props.theme.spacing(0.5)}px;
  @media (min-width: 600px) {
    margin: ${props => props.theme.spacing(1)}px;
  }
`;

export default function ToggleAudioButton(props: { disabled?: boolean }) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { logEvent } = useAnalytics();
  const enabledTitle = useFormatMessage({ id: 'controls.micOff', defaultMessage: 'Mute Audio' });
  const disabledTitle = useFormatMessage({ id: 'controls.micOn', defaultMessage: 'Unmute Audio' });

  const handleClick = () => {
    isAudioEnabled ? logEvent('AUDIO_DISABLE') : logEvent('AUDIO_ENABLE');
    toggleAudioEnabled();
  };

  return (
    <Tooltip
      title={isAudioEnabled ? enabledTitle : disabledTitle}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab
        onClick={handleClick}
        disabled={props.disabled}
        data-cy-audio-toggle
        data-test="toggle-audio-button"
      >
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Fab>
    </Tooltip>
  );
}
