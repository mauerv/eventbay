import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useDominantSpeaker from 'hooks/useDominantSpeaker/useDominantSpeaker';
import useParticipants from 'hooks/useParticipants/useParticipants';
import useScreenShareParticipant from 'hooks/useScreenShareParticipant/useScreenShareParticipant';
import useSelectedParticipant from 'components/VideoProvider/useSelectedParticipant/useSelectedParticipant';

export default function useMainSpeaker() {
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();
  const dominantSpeaker = useDominantSpeaker();
  const participants = useParticipants();
  const {
    room: { localParticipant },
  } = useMediaContext();

  // The participant that is returned is displayed in the main video area. Changing the order of the following
  // variables will change the how the main speaker is determined.
  return (
    selectedParticipant ||
    screenShareParticipant ||
    dominantSpeaker ||
    participants[0] ||
    localParticipant
  );
}
