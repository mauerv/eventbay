import styled from 'styled-components';

import MaterialUIButton from '@material-ui/core/Button';
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

export const Button = styled(MaterialUIButton).attrs(props => ({
  color: props.color || 'primary',
  variant: props.variant || 'contained',
}))`
  border-radius: 0;
  border-top: 1px solid ${props => props.theme.palette.background.default};
  width: ${sidebarWidth};
`;

export const StickyBottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
