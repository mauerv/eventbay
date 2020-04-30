import React from 'react';
import PropTypes from 'prop-types';
import { Participant } from 'twilio-video';

import List from '@material-ui/core/List';
import ParticipantListItem from '../ParticipantListItem/ParticipantListItem';

type Props = {
  participants: Participant[];
};

const ParticipantList = ({ participants }: Props) => {
  return (
    <List dense component="div" disablePadding>
      {participants &&
        participants.map(participant => (
          <ParticipantListItem participant={participant} key={participant.sid} />
        ))}
    </List>
  );
};

ParticipantList.propTypes = {
  participants: PropTypes.array.isRequired,
};

export default ParticipantList;
