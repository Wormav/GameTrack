import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import SignIn from './components/Auth/components/SignIn/SignIn';
import SignUp from './components/Auth/components/Signup/Signup';
import Error404 from './components/Error404/Error404';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [],
  },
  {
    path: 'auth',
    element: <Auth />,
    children: [
      {
        path: 'signin',
        element: <SignIn />,
        children: [],
      },
      {
        path: 'signup',
        element: <SignUp />,
        children: [],
      },

    ],
  },
  {
    path: '*',
    element: <Error404 />,
    children: [],
  },
]);

export default router;
