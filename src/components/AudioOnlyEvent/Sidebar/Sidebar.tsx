import React from 'react';
import { FormattedMessage } from 'react-intl';

import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import useLeaveLobby from 'hooks/useLeaveLobby/useLeaveLobby';
import useJoinRoom from 'components/AudioOnlyEvent/hooks/useJoinRoom/useJoinRoom';
import RoomList from './RoomList/RoomList';
import Hidden from '@material-ui/core/Hidden';
import { Button, MobileDrawer, DesktopDrawer, StickyBottomContainer } from './styles';
import RoomCreateButtons from './RoomCreateButtons/RoomCreateButtons';
import { useLiveSupportContext } from 'components/LiveSupportProvider/LiveSupportProvider';

const Sidebar = () => {
  const { room } = useMediaContext();
  const { showMobileSidebar, toggleMobileSidebar } = useUIState();
  const { roomsState } = useRooms();
  const leaveLobby = useLeaveLobby();
  const { canJoinRooms, joinRoom } = useJoinRoom();
  const { openSupportChat } = useLiveSupportContext();

  const drawer = (
    <>
      <RoomCreateButtons />
      <RoomList
        rooms={roomsState.rooms}
        onRoomClick={joinRoom}
        canJoinRoom={canJoinRooms}
        activeRoom={room.name}
      />
      <StickyBottomContainer>
        <Button onClick={openSupportChat} color="secondary">
          <FormattedMessage id="sidebar.supportBtn" defaultMessage="Need Help?" />
        </Button>
        <Button onClick={leaveLobby}>
          <FormattedMessage id="sidebar.logoutBtn" defaultMessage="Logout" />
        </Button>
      </StickyBottomContainer>
    </>
  );

  return (
    <>
      <Hidden mdUp>
        <MobileDrawer
          open={showMobileSidebar}
          onClose={toggleMobileSidebar}
          onOpen={toggleMobileSidebar}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </MobileDrawer>
      </Hidden>
      <Hidden smDown>
        <DesktopDrawer>{drawer}</DesktopDrawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
