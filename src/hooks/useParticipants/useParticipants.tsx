import { useEffect, useState } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';

export default function useParticipants() {
  const { room } = useMediaContext();
  const [participants, setParticipants] = useState(Array.from(room.participants.values()));

  useEffect(() => {
    const participantConnected = (participant: RemoteParticipant) =>
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    const participantDisconnected = (participant: RemoteParticipant) =>
      setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [room]);

  return participants;
}
