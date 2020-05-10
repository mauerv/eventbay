import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useCanCreateRoom from 'hooks/useCreateRoom/useCanCreateRoom/useCanCreateRoom';
import { useAppState } from 'state';
import useRoomState from 'hooks/useRoomState/useRoomState';

export default function useCreateConversation() {
  const { connect, room } = useMediaContext();
  const { nick, getToken } = useAppState();
  const { logEvent } = useAnalytics();
  const canCreateRoom = useCanCreateRoom();
  const roomState = useRoomState();

  const createConversation = async (roomName: string) => {
    if (!canCreateRoom) return;

    const token = await fetch('/audio/rooms', {
      method: 'POST',
      body: JSON.stringify({
        roomName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => getToken(nick, roomName));

    if (roomState === 'connected') room.disconnect();

    connect(token);

    logEvent('ROOM_CREATE');
  };

  return { canCreateConversation: canCreateRoom, createConversation };
}
