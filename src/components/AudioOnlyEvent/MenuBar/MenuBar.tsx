import React from 'react';

import ToggleFullscreenButton from 'components/ToggleFullScreenButton/ToggleFullScreenButton';
import Hidden from '@material-ui/core/Hidden';
import CreateConversation from './CreateConversation/CreateConversation';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';

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
        <Hidden smDown>
          <RightButtonContainer>
            <ToggleFullscreenButton />
          </RightButtonContainer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
