import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip';
import MUIFab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';

import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';
import useChatContext from 'hooks/useChatContext/useChatContext';

export const Fab = styled(MUIFab)`
  margin: ${props => props.theme.spacing(0.5)}px;
  @media (min-width: 600px) {
    margin: ${props => props.theme.spacing(1)}px;
  }
`;

export default function ToggleChatButton(props: { disabled?: boolean }) {
  const { showChatModal, toggleChatModal } = useUIState();
  const { unreadMessages, clearUnreadMessages } = useChatContext();
  const { logEvent } = useAnalytics();

  const handleClick = () => {
    if (!showChatModal) {
      if (unreadMessages !== 0) clearUnreadMessages();
      logEvent('CHAT_OPEN');
    }
    toggleChatModal();
  };

  return (
    <Tooltip
      title={<FormattedMessage id="controls.chat" defaultMessage="Chat" />}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab onClick={handleClick} disabled={props.disabled}>
        <Badge badgeContent={unreadMessages} color="secondary">
          <ChatIcon />
        </Badge>
      </Fab>
    </Tooltip>
  );
}
