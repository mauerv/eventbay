import React from 'react';

import ToggleFullscreenButton from 'components/ToggleFullScreenButton/ToggleFullScreenButton';
import Hidden from '@material-ui/core/Hidden';
import CreateConversation from './CreateConversation/CreateConversation';

import { AppBar, RightButtonContainer, Toolbar } from './styles';

export default function MenuBar() {
  return (
    <AppBar>
      <Toolbar>
        <CreateConversation />
        <Hidden mdDown>
          <RightButtonContainer>
            <ToggleFullscreenButton />
          </RightButtonContainer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
