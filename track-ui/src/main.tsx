import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import { RouterProvider } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import router from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>,
);
