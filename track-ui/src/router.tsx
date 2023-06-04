import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Error404 from './pages/Error404/Error404';
import Home from './pages/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/Signup/Signup';

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
