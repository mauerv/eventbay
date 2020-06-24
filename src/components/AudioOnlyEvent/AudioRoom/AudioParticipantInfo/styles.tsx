import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import MicOff from '@material-ui/icons/MicOff';
import PersonIcon from '@material-ui/icons/Person';

export const Container = styled.div`
  display: flex;
  left: 56px;
  width: 300px;
  height: 56px;
  border-radius: 5px;
  margin: ${props => props.theme.spacing(1)}px auto;
  justify-content: space-between;
  background-color: ${props => props.theme.palette.secondary.main};
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled(Typography)`
  color: white;
  margin-left: ${props => props.theme.spacing(1)}px;
`;

export const StyledVolumeUpIcon = styled(VolumeUpIcon)`
  color: white;
`;

export const StyledMicOff = styled(MicOff)`
  color: white;
`;

export const StyledPersonIcon = styled(PersonIcon)`
  color: white;
`;
