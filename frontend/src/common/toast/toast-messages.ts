import { IntlShape } from 'react-intl';

export const toastMessages = {
  CONNECTION_ERROR: (intl: IntlShape) =>
    intl.formatMessage({
      defaultMessage: 'Connection error',
      id: '+zd6eR',
    }),
  INTERNAL_ERROR: (intl: IntlShape) =>
    intl.formatMessage({
      defaultMessage: 'Something went wrong',
      id: 'JqiqNj',
    }),
};
