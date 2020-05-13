import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing(1)}px;
`;

export const Participant = styled.div`
  display: flex;
`;

export const Avatar = styled(PersonIcon)`
  margin-right: ${props => props.theme.spacing(1)}px;
`;
