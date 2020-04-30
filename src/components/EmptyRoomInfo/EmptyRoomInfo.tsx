import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Container, Title, Subtitle, Description } from './styles';

declare type Props = {
  show: boolean;
};

const EmptyRoomInfo = ({ show }: Props) => (
  <>
    {show && (
      <Container>
        <Title>
          <FormattedMessage id="emptyRoom.title" defaultMessage="Seems to be empty..." />
        </Title>
        <Subtitle>
          <FormattedMessage
            id="emptyRoom.subtitle"
            defaultMessage="Wait a bit for someone to join"
          />
        </Subtitle>
        <Description>
          <FormattedMessage
            id="emptyRoom.description"
            defaultMessage="Or look for a different room."
          />
        </Description>
      </Container>
    )}
  </>
);

export default EmptyRoomInfo;
