import { ConnectOptions } from 'twilio-video';
import { RoomType } from 'types';

export const selectConnectionOptions = (roomType: RoomType) => {
  switch (roomType) {
    case 'video-group-large':
      return largeGroupOptions;
    case 'video-group-small':
      return smallGroupOptions;
    case 'video-p2p':
      return p2pVideoOptions;
    case 'audio-p2p':
      return p2pAudioOptions;
  }
};

export const smallGroupOptions: ConnectOptions = {
  bandwidthProfile: {
    video: {
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 176, width: 144 },
      },
    },
  },
  maxAudioBitrate: 16000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
};

export const largeGroupOptions: ConnectOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 176, width: 144 },
      },
    },
  },
  maxAudioBitrate: 16000,
  dominantSpeaker: true,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
};

export const p2pVideoOptions: ConnectOptions = {
  audio: true,
  maxAudioBitrate: 16000,
  video: { height: 720, frameRate: 24, width: 1280 },
};

export const p2pAudioOptions: ConnectOptions = {
  audio: true,
  video: false,
};
