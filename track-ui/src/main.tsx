import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './styles/theme';
import router from './router';
import '@styles/main.scss';
import { ErrorProvider } from './contexts/ErrorContext';
import { UserProvider } from './contexts/UserContext';
import { UserGamesProvider } from './contexts/UserGamesContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorProvider>
      <UserProvider>
        <UserGamesProvider>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </ThemeProvider>
        </UserGamesProvider>
      </UserProvider>
    </ErrorProvider>
  </React.StrictMode>,
);
