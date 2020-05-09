import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import { useAppState } from 'state';

export default function useLeaveLobby() {
  const { setNick } = useAppState();
  const { logEvent } = useAnalytics();
  const { room, stopLocalTracks } = useMediaContext();

  const leaveLobby = () => {
    setNick('');
    stopLocalTracks();
    if (room.sid) room.disconnect();

    logEvent('LOBBY_LEAVE');
  };

  return leaveLobby;
}
