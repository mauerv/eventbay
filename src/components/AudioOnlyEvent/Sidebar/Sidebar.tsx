import React from 'react';

import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import useJoinRoom from 'components/AudioOnlyEvent/hooks/useJoinRoom/useJoinRoom';
import RoomList from './RoomList/RoomList';
import Hidden from '@material-ui/core/Hidden';
import { MobileDrawer, DesktopDrawer } from './styles';

const Sidebar = () => {
  const { room } = useMediaContext();
  const { showMobileSidebar, toggleMobileSidebar } = useUIState();
  const { roomsState } = useRooms();
  const { canJoinRooms, joinRoom } = useJoinRoom();

  const drawer = (
    <RoomList
      rooms={roomsState.rooms}
      onRoomClick={joinRoom}
      canJoinRoom={canJoinRooms}
      activeRoom={room.name}
    />
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
