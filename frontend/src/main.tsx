import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootElement = document.getElementById('root')!;

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD748',
    },
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <IntlProvider locale="en" defaultLocale="en" textComponent={Fragment}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <App />
          </QueryClientProvider>
        </IntlProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
