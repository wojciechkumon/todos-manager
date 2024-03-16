import type { Preview } from '@storybook/react';
import { reactIntl } from './reactIntl';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

const preview: Preview = {
  globals: {
    locale: reactIntl.defaultLocale,
    locales: { en: 'English' },
  },

  decorators: [withRouter],

  parameters: {
    reactIntl,
    reactRouter: reactRouterParameters({}),
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
