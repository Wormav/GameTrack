import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './styles/theme';
import router from './router';
import '@styles/main.scss';

const test = {
  name: 'test',
  firstName: 'test',
};

const UserContext = createContext(test);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={test}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
