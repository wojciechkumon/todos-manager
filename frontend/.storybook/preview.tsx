import type { Preview } from '@storybook/react';
import { reactIntl } from './reactIntl';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '../src/index.css';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD748',
    },
  }
});

const queryClient = new QueryClient();

const preview: Preview = {
  globals: {
    locale: reactIntl.defaultLocale,
    locales: { en: 'English' },
  },

  decorators: [
    (Story) => (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <div id="root">
              <Story />
            </div>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    ),
    withRouter,
  ],

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
