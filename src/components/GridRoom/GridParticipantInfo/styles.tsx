import styled from 'styled-components';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';

interface ContainerProps {
  isVideoEnabled: boolean;
  fullWidth: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: calc(var(--vh) * 50);
  background: ${props => (props.isVideoEnabled ? 'transparent' : 'black')};
  width: ${props => (props.fullWidth ? '100%' : '50%')};
  @media (min-width: 600px) {
    width: ${props => (props.fullWidth ? '425px' : '50%')};
  }
  @media (min-width: 1280px) {
    width: 425px;
  }
  & video {
    height: calc(var(--vh) * 50);
    width: 100%;
    object-fit: cover;
  }
`;

export const OtherInfo = styled.div`
  position: absolute;
  bottom: 0;
  right: 5px;
  color: white;
  z-index: 1;
`;

export const NetworkInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 5px;
  z-index: 1;
  display: flex;
  align-items: start;
`;

export const DisplayName = styled.h2`
  margin: 0 15px 0 0;
  color: white;
`;

export const StyledMicOff = styled(MicOff)`
  background-color: ${props => props.theme.palette.error.light};
  padding: 3px;
  border-radius: 5px;
`;

export const StyledVideocamOff = styled(VideocamOff)`
  background-color: ${props => props.theme.palette.error.light};
  padding: 3px;
  border-radius: 5px;
  margin-left: 5px;
`;
