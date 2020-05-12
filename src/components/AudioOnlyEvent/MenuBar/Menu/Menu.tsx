import React, { useState, useRef } from 'react';

import IconButton from '@material-ui/core/IconButton';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import useLeaveLobby from 'hooks/useLeaveLobby/useLeaveLobby';
import { useLiveSupportContext } from 'components/LiveSupportProvider/LiveSupportProvider';
import { Callback } from 'types';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const leaveLobby = useLeaveLobby();
  const { openSupportChat } = useLiveSupportContext();

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = (callback: Callback) => {
    setMenuOpen(false);
    callback();
  };

  return (
    <div ref={anchorRef}>
      <IconButton onClick={() => setMenuOpen(state => !state)}>
        <SettingsIcon />
      </IconButton>
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(state => !state)}
        anchorEl={anchorRef.current}
      >
        <MenuItem onClick={() => handleClick(leaveLobby)}>Logout</MenuItem>
        <MenuItem onClick={() => handleClick(openSupportChat)}>Need Anything?</MenuItem>
      </MenuContainer>
    </div>
  );
}
