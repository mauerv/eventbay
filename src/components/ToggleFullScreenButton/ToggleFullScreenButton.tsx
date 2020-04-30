import React from 'react';
import styled from 'styled-components';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';

import useFullScreenToggle from 'hooks/useFullScreenToggle/useFullScreenToggle';

const FullscreenButton = styled(({ gridSize, children, ...rest }) => (
  <IconButton {...rest}>{children}</IconButton>
))`
  background-color: ${props => props.gridSize > 2 && props.theme.palette.primary.main};
  color: ${props => (props.gridSize > 2 ? 'white' : props.theme.palette.text.default)};
  border-radius: 5px;
  padding: 0;
  margin: 5px;
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 1;
  @media (min-width: 1280px) {
    background-color: transparent;
    color: ${props => props.theme.palette.text.default};
  }
`;

declare type Props = {
  gridSize?: number;
};

export default function ToggleFullscreenButton({ gridSize }: Props) {
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  return (
    <FullscreenButton aria-label={`full screen`} onClick={toggleFullScreen} gridSize={gridSize}>
      {isFullScreen ? (
        <FullscreenExitIcon fontSize="large" />
      ) : (
        <FullscreenIcon fontSize="large" data-test="button-test-dog" />
      )}
    </FullscreenButton>
  );
}
