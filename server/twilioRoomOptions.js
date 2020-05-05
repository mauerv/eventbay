const { VIDEO_P2P, AUDIO_P2P, VIDEO_GROUP_LARGE, VIDEO_GROUP_SMALL } = require('./constants');

const getRoomOptions = roomType => {
  let type, maxParticipants;
  switch (roomType) {
    case VIDEO_GROUP_LARGE:
      type = 'group';
      maxParticipants = 10;
      break;
    case VIDEO_GROUP_SMALL:
      type = 'group-small';
      maxParticipants = 4;
      break;
    case VIDEO_P2P:
      type = 'peer-to-peer';
      maxParticipants = 4;
      break;
    case AUDIO_P2P:
      type = 'peer-to-peer';
      maxParticipants = 10;
      break;
    default:
      throw Error('Invalid room type');
  }

  return { type, maxParticipants };
};

module.exports = getRoomOptions;
