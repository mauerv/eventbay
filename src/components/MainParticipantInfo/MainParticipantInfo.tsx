import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

import usePublications from 'hooks/usePublications/usePublications';
import VideocamOff from '@material-ui/icons/VideocamOff';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  identity: {
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '0.1em 0.3em',
    margin: '1em',
    fontSize: '1.2em',
    display: 'inline-flex',
    '& svg': {
      marginLeft: '0.3em',
    },
  },
  infoContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    padding: '0.4em',
    width: '100%',
  },
});

interface MainParticipantInfoProps {
  participant: LocalParticipant | RemoteParticipant;
  children: React.ReactNode;
}

export default function MainParticipantInfo({ participant, children }: MainParticipantInfoProps) {
  const classes = useStyles();

  const publications = usePublications(participant);
  const videoPublication = publications.find(p => p.trackName === 'camera');
  const isVideoEnabled = Boolean(videoPublication);

  return (
    <div data-cy-main-participant className={clsx(classes.container)}>
      <div className={classes.infoContainer}>
        <h4 className={classes.identity}>
          {participant.identity}
          {!isVideoEnabled && <VideocamOff />}
        </h4>
      </div>
      {children}
    </div>
  );
}
