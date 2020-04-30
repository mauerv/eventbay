import React from 'react';

import { CustomTypography } from './styles';

type Props = {
  current: number;
  max: number;
};

const ParticipantNumber = ({ current, max }: Props) => (
  <CustomTypography isFull={current === max}>
    {current} / {max}
  </CustomTypography>
);

export default ParticipantNumber;
