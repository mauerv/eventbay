import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from 'twilio-video';
import 'twilio';

declare module 'twilio' {
  interface RoomInstance {
    uniqueName: string;
    participants: any[];
    maxParticipants: number;
    sid: string;
  }
}

declare module 'twilio-video' {
  interface Room {
    uniqueName: string;
  }

  interface LocalParticipant {
    setBandwidthProfile: (bandwidthProfile: BandwidthProfileOptions) => void;
    publishTrack(
      track: LocalTrack,
      options?: { priority: Track.Priority }
    ): Promise<LocalTrackPublication>;
  }

  interface VideoCodecSettings {
    simulcast?: boolean;
  }

  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }

  interface RemoteVideoTrack {
    isSwitchedOff: boolean;
    setPriority: (priority: Track.Priority | null) => void;
  }

  interface VideoBandwidthProfileOptions {
    trackSwitchOffMode?: 'predicted' | 'detected' | 'disabled';
  }
}

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }
  interface Window {
    webkitAudioContext: typeof AudioContext;
    audioTrack: any;
  }
}

export type Callback = (...args: any[]) => void;

export type ErrorCallback = (error: TwilioError) => void;

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;

export type RoomType = 'video-group-large' | 'video-group-small' | 'video-p2p' | 'audio-p2p';

export type TrackType = RemoteVideoTrack | LocalVideoTrack | undefined | null;

export type Message = {
  identity: string;
  message: string;
};
