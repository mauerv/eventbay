import React, { useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { RoomType } from 'types';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import { useAppState } from 'state';
import roomNames, { getRoomName } from 'util/roomNames';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useRooms from 'components/RoomsProvider/useRooms/useRooms';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useLeaveLobby from 'hooks/useLeaveLobby/useLeaveLobby';

import RoomList from './RoomList/RoomList';
import HelpDialog from 'components/HelpDialog/HelpDialog';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import { Button, MobileDrawer, DesktopDrawer, MenuButton, StickyBottomContainer } from './styles';
import RoomCreateButtons from './RoomCreateButtons/RoomCreateButtons';

const Sidebar = () => {
  const { nick, getToken, isFetching } = useAppState();
  const { isConnecting, connect, room, setRoomType } = useVideoContext();
  const { showMobileUi, showMobileSidebar, toggleMobileSidebar, toggleHelpDialog } = useUIState();
  const { roomsState } = useRooms();
  const roomState = useRoomState();
  const { logEvent } = useAnalytics();
  const leaveLobby = useLeaveLobby();

  const handleCreateRoom = async (roomType: RoomType) => {
    if (!canCreateRoom) return;

    const roomName = getRoomName(roomsState.rooms) as string; // TODO: Remove when solved.

    const token = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({
        roomName,
        roomType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => getToken(nick, roomName));

    if (roomState === 'connected') room.disconnect();

    setRoomType(roomType);
    connect(token, roomType);

    logEvent('ROOM_CREATE', { roomType });
  };

  const handleRoomClick = async (roomName: string, roomType: RoomType) => {
    if (!canJoinRoom) return;
    roomState === 'connected'
      ? logEvent('ROOM_SWITCH', { roomType })
      : logEvent('ROOM_JOIN', { roomType });

    if (roomState === 'connected') room.disconnect();
    const token = await getToken(nick, roomName);
    setRoomType(roomType);
    connect(token, roomType);
  };

  const canJoinRoom = useMemo(() => {
    return !isFetching && !isConnecting && !roomsState.isFetching;
  }, [isFetching, isConnecting, roomsState]);

  const canCreateRoom = useMemo(() => {
    return canJoinRoom && roomsState.rooms.length < roomNames.length;
  }, [canJoinRoom, roomsState]);

  const handleSupportRequest = () => {
    toggleHelpDialog();

    logEvent('HELP_MODAL_OPEN');
  };

  const drawer = (
    <>
      <RoomCreateButtons handleCreateRoom={handleCreateRoom} canCreateRoom={canCreateRoom} />
      <RoomList
        rooms={roomsState.rooms}
        onRoomClick={handleRoomClick}
        canJoinRoom={canJoinRoom}
        activeRoom={room.name}
      />
      <StickyBottomContainer>
        <HelpDialog />
        <Button onClick={handleSupportRequest} color="secondary">
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
