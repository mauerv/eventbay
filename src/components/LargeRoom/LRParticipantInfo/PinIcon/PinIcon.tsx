import React from 'react';
import { Pin } from '@primer/octicons-react';
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';
import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';

export default function PinIcon() {
  const title = useFormatMessage({
    id: 'pinicon.title',
    defaultMessage: 'Participant is pinned. Click to un-pin.',
  });
  return (
    <Tooltip title={title} placement="top">
      <SvgIcon style={{ float: 'right', fontSize: '29px' }}>
        <Pin />
      </SvgIcon>
    </Tooltip>
  );
}
