import { ConnectOptions } from 'twilio-video';

export const gridOptions: ConnectOptions = {
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

export const collaborationOptions: ConnectOptions = {
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

export const p2pOptions: ConnectOptions = {
  audio: true,
  maxAudioBitrate: 16000,
  video: { height: 720, frameRate: 24, width: 1280 },
};

export const p2pAudioOptions: ConnectOptions = {
  audio: true,
  video: false,
};
