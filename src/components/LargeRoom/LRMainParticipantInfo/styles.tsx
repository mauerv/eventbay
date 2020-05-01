import styled from 'styled-components';

import VideocamOff from '@material-ui/icons/VideocamOff';

type ContainerProps = {
  isVideoEnabled: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  height: calc(var(--vh) * 67);
  width: calc((var(--vh) * 67) * 1.78);
  max-width: 100%;
  background: ${props => (props.isVideoEnabled ? 'transparent' : 'black')};
  & video {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  @media (min-width: 960px) {
    & video {
      object-fit: contain;
    }
  }
`;

export const MainInfo = styled.div`
  bottom: 0;
  left: auto;
  color: white;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: start;
`;

export const StyledVideocamOff = styled(VideocamOff)`
  background-color: ${props => props.theme.palette.error.light};
  padding: 3px;
  border-radius: 5px;
  margin-left: 5px;
`;

export const DisplayName = styled.h3`
  margin: 0 15px 0 0;
  color: white;
`;
