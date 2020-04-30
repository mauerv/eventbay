import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppState } from 'state';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import isBlank from 'util/isBlank';
import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';
import useChatContext from 'hooks/useChatContext/useChatContext';
import useElementScroll from 'hooks/useElementScroll/useElementScroll';

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import {
  SendMessageContainer,
  Form,
  Submit,
  ChatDrawer,
  MessageSender,
  MessageList,
  MessageContainer,
  CloseButton,
} from './styles';
import ListItem from '@material-ui/core/ListItem';

export default function Chat() {
  const { nick } = useAppState();
  const [message, setMessage] = useState('');
  const { showChatModal, toggleChatModal } = useUIState();
  const { logEvent } = useAnalytics();
  const placeholderText = useFormatMessage({
    id: 'chat.inputPlaceholder',
    defaultMessage: 'Send a chat message...',
  });
  const { messages, broadcastMessage } = useChatContext();
  const elementRef = useElementScroll(messages);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBlank(message)) return;

    broadcastMessage(nick, message);
    logEvent('CHAT_MESSAGE_SENT');

    setMessage('');
  };

  return (
    <ChatDrawer open={showChatModal} onClose={toggleChatModal}>
      <Hidden smUp>
        <CloseButton onClick={toggleChatModal} />
        <Divider />
      </Hidden>
      <MessageList ref={elementRef}>
        {messages.map((msg, index) => (
          <ListItem dense={true} key={index}>
            <MessageContainer>
              <MessageSender>{msg.identity}</MessageSender>: {msg.message}
            </MessageContainer>
          </ListItem>
        ))}
      </MessageList>
      <SendMessageContainer>
        <Divider />
        <Form onSubmit={onSubmit}>
          <InputBase
            onChange={onChange}
            placeholder={placeholderText}
            value={message}
            fullWidth
            autoFocus={true}
          />
          <Submit disabled={isBlank(message)}>
            <FormattedMessage id="chat.submit" defaultMessage="Send" />
          </Submit>
        </Form>
      </SendMessageContainer>
    </ChatDrawer>
  );
}
