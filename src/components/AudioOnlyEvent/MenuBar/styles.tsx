import React from 'react';
import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import MUIToolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export const AppBar = styled(MUIAppBar).attrs({ position: 'static' })`
  background-color: ${props => props.theme.palette.background.default};
`;

export const RightButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Toolbar = styled(MUIToolbar)`
  height: calc(var(--vh) * 8);
  @media (max-width: 480px) {
    padding: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (min-width: 960px) {
    magin-leftt: 2.2em;
  }
`;

export const MenuButton = styled(({ handleToggle, ...rest }) => (
  <Hidden mdUp>
    <IconButton edge="start" onClick={handleToggle} {...rest}>
      <MenuIcon />
    </IconButton>
  </Hidden>
))`
  position: fixed;
  z-index: 1;
  border-radius: 4px;
`;
