import styled from 'styled-components';
import MUITextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (min-width: 960px) {
    magin-leftt: 2.2em;
  }
`;

export const TextField = styled(MUITextField)`
  margin-left: ${props => props.theme.spacing(1)}px;
  margin-right: ${props => props.theme.spacing(1)}px;
`;

export const JoinButton = styled(Button)`
  marrgin: 1em;
`;

export const LoadingSpinner = styled(CircularProgress)`
  margin-left: 1em;
`;
