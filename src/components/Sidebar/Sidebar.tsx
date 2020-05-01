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

import RoomList from './RoomList/RoomList';
import HelpDialog from 'components/HelpDialog/HelpDialog';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import { Button, MobileDrawer, DesktopDrawer, MenuButton, StickyBottomContainer } from './styles';

const Sidebar = () => {
  const { nick, setNick, getToken, isFetching } = useAppState();
  const { isConnecting, connect, room, setRoomType, stopLocalTracks } = useVideoContext();
  const { showMobileUi, showMobileSidebar, toggleMobileSidebar, toggleHelpDialog } = useUIState();
  const { roomsState } = useRooms();
  const roomState = useRoomState();
  const { logEvent } = useAnalytics();

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

  const handleLeaveLobby = () => {
    setNick('');
    stopLocalTracks();
    if (room.sid) {
      room.disconnect();
    }

    logEvent('LOBBY_LEAVE');
    return <Redirect to="/" />;
  };

  const handleSupportRequest = () => {
    toggleHelpDialog();

    logEvent('HELP_MODAL_OPEN');
  };

  const drawer = (
    <>
      <Button onClick={() => handleCreateRoom('video')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createSmallBtn" defaultMessage="Create Video Room" />
      </Button>
      <Button onClick={() => handleCreateRoom('audio')} disabled={!canCreateRoom}>
        <FormattedMessage id="sidebar.createLargeBtn" defaultMessage="Create Audio Room" />
      </Button>
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
        <Button onClick={handleLeaveLobby}>
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
