import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIToolbar from '@material-ui/core/Toolbar';
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
