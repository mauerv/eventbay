import React, { ChangeEvent, FormEvent, useState } from 'react';

import { TextField, Form, JoinButton, LoadingSpinner } from './styles';
import useCreateConversation from '../../hooks/useCreateConversation/useCreateConversation';
import { useAppState } from 'state';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';

export default function CreateConversation() {
  const { nick, isFetching } = useAppState();
  const { createConversation, canCreateConversation } = useCreateConversation();
  const { isConnecting } = useMediaContext();

  const [roomName, setRoomName] = useState('');
  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createConversation(roomName);
    setRoomName('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        id="menu-room"
        label="Lets talk about..."
        value={roomName}
        onChange={handleRoomNameChange}
        margin="dense"
      />
      <JoinButton
        type="submit"
        color="primary"
        variant="contained"
        disabled={!canCreateConversation || !roomName}
      >
        Start Conversation
      </JoinButton>
      {(isConnecting || isFetching) && <LoadingSpinner />}
    </Form>
  );
}
