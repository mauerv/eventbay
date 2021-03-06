import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import EndCallButton from './EndCallButton/EndCallButton';
import ToggleAudioButton from './ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from './ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from './ToogleScreenShareButton/ToggleScreenShareButton';
import ToggleChatButton from './ToggleChatButton/ToggleChatButton';

import useIsUserActive from './useIsUserActive/useIsUserActive';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      right: '50%',
      transform: 'translate(50%, 20px)',
      bottom: '20px',
      zIndex: 1,
      transition: 'opacity 1.2s, transform 1.2s, visibility 0s 1.2s',
      opacity: 0,
      visibility: 'hidden',
      '&.showControls, &:hover': {
        transition: 'opacity 0.6s, transform 0.6s, visibility 0s',
        opacity: 1,
        visibility: 'visible',
        transform: 'translate(50%, 0px)',
      },
    },
  })
);

export default function Controls() {
  const classes = useStyles();
  const roomState = useRoomState();
  const { roomType } = useMediaContext();
  const isReconnecting = roomState === 'reconnecting';
  const isUserActive = useIsUserActive();
  const showControls = isUserActive || roomState === 'disconnected';

  return (
    <div className={clsx(classes.container, { showControls })}>
      <ToggleAudioButton disabled={isReconnecting} />
      {roomType !== 'audio-p2p' && <ToggleVideoButton disabled={isReconnecting} />}
      {roomState !== 'disconnected' && (
        <>
          {roomType === 'video-group-large' && (
            <ToggleScreenShareButton disabled={isReconnecting} />
          )}
          <ToggleChatButton disabled={isReconnecting} />
          <EndCallButton />
        </>
      )}
    </div>
  );
}
