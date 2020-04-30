import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export const Content = styled.div`
  padding: 0 ${props => props.theme.spacing(2)}px;
`;

export const Section = styled.div`
  margin: ${props => props.theme.spacing(2)}px auto;
`;

export const SupportText = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(0.5)}px;
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.palette.secondary.contrastText};
`;
