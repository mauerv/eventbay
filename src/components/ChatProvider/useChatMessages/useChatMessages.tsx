import { useState, useEffect, useRef } from 'react';
import { Message } from 'types';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';

export default function useChatMessages(roomName: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { showChatModal } = useUIState();
  const [unreadMessages, setUnreadMessages] = useState(0);

  const addUnreadMessage = () => setUnreadMessages(prevMessages => prevMessages + 1);

  const clearUnreadMessages = () => setUnreadMessages(0);

  const ws = useRef<WebSocket>(null!);

  useEffect(() => {
    let url = `ws://localhost:8081/chat/${roomName}`;
    if (process.env.NODE_ENV === 'production') {
      url = `wss://${window.location.host}/chat/${roomName}`;
    }

    ws.current = new WebSocket(url);

    ws.current.onmessage = msg => {
      if (!showChatModal) addUnreadMessage();
      setMessages(prevMessages => [...prevMessages, JSON.parse(msg.data)]);
    };

    return () => ws.current.close();
  }, [roomName, showChatModal]);

  const broadcastMessage = (nick: string, message: string) => {
    ws.current.send(JSON.stringify({ identity: nick, message }));
  };

  return { messages, broadcastMessage, unreadMessages, addUnreadMessage, clearUnreadMessages };
}
