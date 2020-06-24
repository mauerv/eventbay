import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const sidebarWidth = '240px';

export const DesktopDrawer = styled(Drawer).attrs({
  variant: 'permanent',
  open: true,
})`
  display: inline;
  & .MuiPaper-root {
    width: ${sidebarWidth};
    z-index: 1;
  }
`;

export const MobileDrawer = styled(SwipeableDrawer).attrs({
  variant: 'temporary',
})`
  display: inline;
  & .MuiPaper-root {
    width: ${sidebarWidth};
    z-index: 1;
  }
`;
