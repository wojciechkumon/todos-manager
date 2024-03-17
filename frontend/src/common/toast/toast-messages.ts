import { IntlShape } from 'react-intl';

export const toastMessages = {
  CONNECTION_ERROR: (intl: IntlShape) =>
    intl.formatMessage({
      defaultMessage: 'Connection error',
      id: '+zd6eR',
    }),
  SOMETHING_WENT_ERROR: (intl: IntlShape) =>
    intl.formatMessage({
      defaultMessage: 'Something went wrong',
      id: 'JqiqNj',
    }),
};
