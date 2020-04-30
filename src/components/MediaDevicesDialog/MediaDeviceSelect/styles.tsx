import styled from 'styled-components';

import MUIFormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const FormControl = styled(MUIFormControl)`
  display: flex;
  flex-direction: row;
  min-width: 320px;
`;

export const MediaSelect = styled(Select)`
  width: 100%;
`;

export const MediaIcon = styled.div``;
