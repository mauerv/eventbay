import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import { useAppState } from 'state';

export default function useLeaveLobby() {
  const { setNick } = useAppState();
  const { logEvent } = useAnalytics();
  const { room, stopLocalTracks } = useVideoContext();

  const leaveLobby = () => {
    setNick('');
    stopLocalTracks();
    if (room.sid) room.disconnect();

    logEvent('LOBBY_LEAVE');
  };

  return leaveLobby;
}
