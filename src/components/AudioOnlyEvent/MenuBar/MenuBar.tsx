import React from 'react';

import Hidden from '@material-ui/core/Hidden';
import CreateConversation from './CreateConversation/CreateConversation';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import Menu from './Menu/Menu';

import { AppBar, RightButtonContainer, Toolbar, MenuButton } from './styles';

export default function MenuBar() {
  const { toggleMobileSidebar } = useUIState();

  return (
    <AppBar>
      <Toolbar>
        <Hidden smUp>
          <MenuButton handleToggle={toggleMobileSidebar} />
        </Hidden>
        <Hidden xsDown>
          <CreateConversation />
        </Hidden>
        <RightButtonContainer>
          <Menu />
        </RightButtonContainer>
      </Toolbar>
    </AppBar>
  );
}
