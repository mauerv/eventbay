import styled from 'styled-components';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';

type ContainerProps = {
  isVideoEnabled: boolean;
  isVideoSwitchedOff: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: calc(var(--vh) * 33);
  background: ${props => (props.isVideoEnabled ? 'transparent' : 'black')};
  width: 30vw;
  & video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: ${props =>
      props.isVideoSwitchedOff ? 'blur(4px) grayscale(1) brightness(0.5)' : 'none'};
  }
  @media (min-width: 600px) {
    width: 25vw;
  }
  @media (min-width: 1280px) {
    width: 20vw;
  }
`;

export const MainInfo = styled.div`
  top: 0;
  left: 5px;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: start;
`;

export const DisplayName = styled.h4`
  margin: 0 15px 0 0;
  color: white;
`;

export const MediaInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 5px;
  color: white;
  z-index: 1;
`;

export const OtherInfo = styled.div`
  position: absolute;
  bottom: top;
  right: -8px;
  color: white;
  z-index: 1;
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
