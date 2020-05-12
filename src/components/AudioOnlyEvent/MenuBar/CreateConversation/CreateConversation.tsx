import React, { ChangeEvent, FormEvent, useState } from 'react';

import { TextField, Form, JoinButton, LoadingSpinner } from './styles';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useCreateConversation from '../../hooks/useCreateConversation/useCreateConversation';
import { useAppState } from 'state';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';

export default function CreateConversation() {
  const roomState = useRoomState();
  const { nick, isFetching } = useAppState();
  const { createConversation } = useCreateConversation();
  const { isConnecting } = useMediaContext();

  const [roomName, setRoomName] = useState('');
  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createConversation(roomName);
  };

  return (
    <>
      {roomState === 'disconnected' ? (
        <Form onSubmit={handleSubmit}>
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
    </>
  );
}
