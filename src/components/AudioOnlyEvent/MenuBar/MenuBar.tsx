import React, { ChangeEvent, FormEvent, useState } from 'react';

import ToggleFullscreenButton from 'components/ToggleFullScreenButton/ToggleFullScreenButton';
import { useAppState } from 'state';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import {
  AppBar,
  RightButtonContainer,
  Toolbar,
  TextField,
  Form,
  DisplayName,
  JoinButton,
  LoadingSpinner,
} from './styles';

export default function MenuBar() {
  const { nick, getToken, isFetching } = useAppState();
  const { isConnecting, connect } = useMediaContext();
  const roomState = useRoomState();

  const [roomName, setRoomName] = useState('');

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    getToken(nick, roomName).then(token => connect(token));
  };

  return (
    <AppBar>
      <Toolbar>
        {roomState === 'disconnected' ? (
          <Form onSubmit={handleSubmit}>
            <DisplayName>{nick}</DisplayName>
            <TextField
              id="menu-room"
              label="Topic"
              value={roomName}
              onChange={handleRoomNameChange}
              margin="dense"
            />
            <JoinButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={isConnecting || !nick || !roomName || isFetching}
            >
              Start Conversation
            </JoinButton>
            {(isConnecting || isFetching) && <LoadingSpinner />}
          </Form>
        ) : (
          <h3>{roomName}</h3>
        )}
        <RightButtonContainer>
          <ToggleFullscreenButton />
        </RightButtonContainer>
      </Toolbar>
    </AppBar>
  );
}
