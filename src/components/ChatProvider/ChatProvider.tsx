import React, { createContext, ReactNode } from 'react';
import { Message, Callback } from 'types';
import useChatMessages from './useChatMessages/useChatMessages';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';

type Context = {
  messages: Message[];
  broadcastMessage: Callback;
  unreadMessages: number;
  addUnreadMessage: Callback;
  clearUnreadMessages: Callback;
};

type Props = {
  children: ReactNode;
};

export const ChatContext = createContext<Context>(null!);

export default function ChatProvider({ children }: Props) {
  const { room } = useVideoContext();
  const {
    messages,
    broadcastMessage,
    unreadMessages,
    addUnreadMessage,
    clearUnreadMessages,
  } = useChatMessages(room.name);

  return (
    <ChatContext.Provider
      value={{ messages, broadcastMessage, unreadMessages, addUnreadMessage, clearUnreadMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}
