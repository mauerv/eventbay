import React from 'react';

import { CustomTypography } from './styles';

type Props = {
  current: number;
  max: number;
};

export default function CapacityIndicator({ current, max }: Props) {
  return (
    <CustomTypography isFull={current === max}>
      {current} / {max}
    </CustomTypography>
  );
}
