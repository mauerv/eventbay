import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

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
  margin-left: ${props => props.theme.spacing(1)}px;
`;
