import React from 'react';
import { FormattedMessage } from 'react-intl';

import useAnalytics from 'hooks/useAnalytics/useAnalytics';
import useUIState from 'components/UIStateProvider/useUIState/useUIState';

import Dialog from '@material-ui/core/Dialog';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Content, Section, SupportText, StyledLink } from './styles';

export default function HelpDialog() {
  const { showHelpDialog, toggleHelpDialog } = useUIState();
  const { logEvent } = useAnalytics();

  return (
    <Dialog open={showHelpDialog} onClose={toggleHelpDialog}>
      <Content>
        <Section>
          <Typography variant="h6">
            <FormattedMessage id="support.title" defaultMessage="Need Help?" />
          </Typography>
          <Typography>
            <FormattedMessage
              id="support.testDescriptionStart"
              defaultMessage="P2P video transfer doesn't work with some browsers. Try"
            />{' '}
            <Link
              onClick={() => logEvent('WEBRTC_TEST_REQUEST')}
              href="https://test.webrtc.org/"
              target="_blank"
              rel="noopener"
            >
              <FormattedMessage id="support.testLink" defaultMessage="this test" />
            </Link>{' '}
            <FormattedMessage
              id="support.testDescriptionEnd"
              defaultMessage="from Google to see if your device is compatible. Updating your browser to the latest version solves most problems."
            />
          </Typography>
        </Section>
        <Divider />
        <Section>
          <SupportText>
            <FormattedMessage
              id="support.whatsappSupportTitle"
              defaultMessage="Instant support at +542616027616"
            />
          </SupportText>
          <Button
            variant="contained"
            color="primary"
            startIcon={<WhatsAppIcon />}
            onClick={() => logEvent('WHATSAPP_HELP_REQUEST')}
          >
            <StyledLink href="https://is.gd/eMZbVS" target="_blank" rel="noopener">
              <FormattedMessage
                id="support.whatsappSupportBtn"
                defaultMessage="Contact me on Whatsapp"
              />
            </StyledLink>
          </Button>
        </Section>
      </Content>
    </Dialog>
  );
}
