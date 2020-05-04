const getRoomOptions = roomType => {
  let type, maxParticipants;
  switch (roomType) {
    case 'video-group-large':
      type = 'group';
      maxParticipants = 10;
      break;
    case 'video-group-small':
      type = 'group-small';
      maxParticipants = 4;
      break;
    case 'video-p2p':
      type = 'peer-to-peer';
      maxParticipants = 4;
      break;
    case 'audio-p2p':
      type = 'peer-to-peer';
      maxParticipants = 10;
      break;
    default:
      throw Error('Invalid room type');
  }

  return { type, maxParticipants };
};

module.exports = getRoomOptions;
