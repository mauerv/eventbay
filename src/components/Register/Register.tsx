import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import Video from 'twilio-video';
import { FormattedMessage } from 'react-intl';

import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import { Container, Title, Description } from './styles';
import { useAppState } from 'state';
import SimpleForm from 'components/SimpleForm/SimpleForm';
import Alert from '@material-ui/lab/Alert';

const Register = () => {
  const { nick, setNick } = useAppState();
  const [localNick, setLocalNick] = useState('');
  const { logEvent } = useAnalytics();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setLocalNick(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localNick) {
      setNick(localNick);
      logEvent('EVENT_JOIN');
    }
  };

  if (nick) return <Redirect to="/lobby" />;
  return (
    <Container>
      <Title>
        <FormattedMessage id="register.brand" defaultMessage="Welcome to Emi's Winery" />
      </Title>
      <Description>
        <FormattedMessage
          id="register.description"
          defaultMessage="A place to talk about crypto, product ideas, entrepreneurship and global trends. Pick a nick and join!"
        />
      </Description>
      <SimpleForm
        value={localNick}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitText={<FormattedMessage id="register.join" defaultMessage="Join" />}
        label="Nick"
        disabled={!Video.isSupported}
      />
      {!Video.isSupported && (
        <Alert severity="warning">
          <FormattedMessage
            id="register.alert"
            defaultMessage="Please use Safari from iPhone/iPad"
          />
        </Alert>
      )}
    </Container>
  );
};

export default Register;
