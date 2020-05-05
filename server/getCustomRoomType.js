const { VIDEO_P2P, AUDIO_P2P, VIDEO_GROUP_LARGE, VIDEO_GROUP_SMALL } = require('./constants');

const getCustomRoomType = (type, maxParticipants) => {
  if (type === 'group') {
    return VIDEO_GROUP_LARGE;
  } else if (type === 'group-small') {
    return VIDEO_GROUP_SMALL;
  } else if (type === 'peer-to-peer') {
    return maxParticipants > 4 ? AUDIO_P2P : VIDEO_P2P;
  }
};

module.exports = getCustomRoomType;
