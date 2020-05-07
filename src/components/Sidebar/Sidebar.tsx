import React from 'react';
import { FormattedMessage } from 'react-intl';

import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import useLeaveLobby from 'hooks/useLeaveLobby/useLeaveLobby';
import useJoinRoom from 'hooks/useJoinRoom/useJoinRoom';
import RoomList from './RoomList/RoomList';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import { Button, MobileDrawer, DesktopDrawer, MenuButton, StickyBottomContainer } from './styles';
import RoomCreateButtons from './RoomCreateButtons/RoomCreateButtons';
import useCreateRoom from 'hooks/useCreateRoom/useCreateRoom';

const Sidebar = () => {
  const { room } = useVideoContext();
  const { showMobileUi, showMobileSidebar, toggleMobileSidebar, toggleHelpDialog } = useUIState();
  const { roomsState } = useRooms();
  const leaveLobby = useLeaveLobby();
  const { canJoinRooms, joinRoom } = useJoinRoom();
  const { canCreateRoom, createRoom } = useCreateRoom();

  const drawer = (
    <>
      <RoomCreateButtons handleCreateRoom={createRoom} canCreateRoom={canCreateRoom} />
      <RoomList
        rooms={roomsState.rooms}
        onRoomClick={joinRoom}
        canJoinRoom={canJoinRooms}
        activeRoom={room.name}
      />
      <StickyBottomContainer>
        <Button onClick={leaveLobby}>
          <FormattedMessage id="sidebar.logoutBtn" defaultMessage="Logout" />
        </Button>
      </StickyBottomContainer>
    </>
  );

  return (
    <>
      <Collapse in={showMobileUi}>
        <MenuButton handleToggle={toggleMobileSidebar} />
      </Collapse>
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
