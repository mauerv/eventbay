import React from 'react';

import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import RoomList from './RoomList/RoomList';
import Hidden from '@material-ui/core/Hidden';
import { MobileDrawer, DesktopDrawer } from './styles';

const Sidebar = () => {
  const { showMobileSidebar, toggleMobileSidebar } = useUIState();

  return (
    <>
      <Hidden mdUp>
        <MobileDrawer
          open={showMobileSidebar}
          onClose={toggleMobileSidebar}
          onOpen={toggleMobileSidebar}
          ModalProps={{ keepMounted: true }}
        >
          <RoomList />
        </MobileDrawer>
      </Hidden>
      <Hidden smDown>
        <DesktopDrawer>
          <RoomList />
        </DesktopDrawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
