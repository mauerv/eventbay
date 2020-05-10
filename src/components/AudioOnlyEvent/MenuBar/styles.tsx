import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUITextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const AppBar = styled(MUIAppBar).attrs({ position: 'static' })`
  background-color: ${props => props.theme.palette.background.default};
`;

export const RightButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const Toolbar = styled(MUIToolbar)`
  @media (max-width: 480px) {
    padding: 0;
  }
`;

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

export const DisplayName = styled(Typography).attrs({ variant: 'body1' })`
  margin: 1.1em 0.6em;
  min-width: 200px;
  font-weight: 600;
  color: black;
`;

export const JoinButton = styled(Button)`
  marrgin: 1em;
`;

export const LoadingSpinner = styled(CircularProgress)`
  margin-left: 1em;
`;
