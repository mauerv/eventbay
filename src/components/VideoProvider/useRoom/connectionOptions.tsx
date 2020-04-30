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
  dominantSpeaker: true,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
};
