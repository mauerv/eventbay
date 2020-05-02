import { useEffect, useState } from 'react';
import { LocalAudioTrack, RemoteAudioTrack } from 'twilio-video';

type trackType = LocalAudioTrack | RemoteAudioTrack;

export default function useIsSpeaking(track: trackType) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  return isSpeaking;
}
