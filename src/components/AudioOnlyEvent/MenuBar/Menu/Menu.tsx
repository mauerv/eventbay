import React, { useState, useRef } from 'react';

import IconButton from '@material-ui/core/IconButton';
import MenuContainer from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import useLeaveLobby from 'hooks/useLeaveLobby/useLeaveLobby';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const leaveLobby = useLeaveLobby();

  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={anchorRef}>
      <IconButton onClick={() => setMenuOpen(state => !state)}>
        <MoreIcon />
      </IconButton>
      <MenuContainer
        open={menuOpen}
        onClose={() => setMenuOpen(state => !state)}
        anchorEl={anchorRef.current}
      >
        <MenuItem onClick={leaveLobby}>Logout</MenuItem>
      </MenuContainer>
    </div>
  );
}
