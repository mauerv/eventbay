import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';
import useParticipantIsReconnecting from 'hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  indicator: {
    width: '10px',
    height: '10px',
    borderRadius: '100%',
    background: '#0c0',
    display: 'inline-block',
    marginRight: '3px',
  },
  isReconnecting: {
    background: '#ffb100',
  },
});

declare type Props = {
  participant: LocalParticipant | RemoteParticipant;
};

export default function ParticipantConnectionIndicator({ participant }: Props) {
  const isReconnecting = useParticipantIsReconnecting(participant);
  const classes = useStyles();
  const reconnectingText = useFormatMessage({
    id: 'connection.reconnecting',
    defaultMessage: 'Participant is reconnecting',
  });
  const connectedText = useFormatMessage({
    id: 'connection.connected',
    defaultMessage: 'Participant is connected',
  });

  return (
    <Tooltip title={isReconnecting ? reconnectingText : connectedText}>
      <span
        className={clsx(classes.indicator, { [classes.isReconnecting]: isReconnecting })}
      ></span>
    </Tooltip>
  );
}
