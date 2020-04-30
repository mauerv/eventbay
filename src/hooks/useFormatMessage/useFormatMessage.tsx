import { useIntl, MessageDescriptor } from 'react-intl';

export default function useFormatMessage(messageDescriptor: MessageDescriptor) {
  const intl = useIntl();
  return intl.formatMessage(messageDescriptor);
}
