import React from 'react';
import PropTypes from 'prop-types';
import { Participant } from 'twilio-video';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import CakeTwoToneIcon from '@material-ui/icons/CakeTwoTone';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';

type Props = {
  participant: Participant;
};

const ParticipantListItem = ({ participant }: Props) => {
  let content = <PersonIcon />;

  if (participant.identity === 'ezekemel') {
    content = <CakeTwoToneIcon color="primary" />;
  } else if (participant.identity === 'julen' || participant.identity === 'mauerv') {
    content = <BuildOutlinedIcon />;
  }

  return (
    <ListItem component="div" data-test="participant-list-item">
      <ListItemIcon>{content}</ListItemIcon>
      <ListItemText>{participant.identity}</ListItemText>
    </ListItem>
  );
};

ParticipantListItem.propTypes = {
  participant: PropTypes.shape({
    identity: PropTypes.string.isRequired,
  }).isRequired,
};

export default ParticipantListItem;
