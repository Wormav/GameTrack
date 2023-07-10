import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Error404 from './pages/Error404/Error404';
import Home from './pages/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/Signup/Signup';
import GameDetails from './pages/GameDetails/GameDetails';
import Layout from './components/Layout/Layout';
import MyGames from './pages/MyGames/MyGames';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [],
      },
      {
        path: 'game/:id',
        element: <GameDetails />,
        children: [],
      },
      {
        path: 'mygames',
        element: <MyGames />,
        children: [],
      },
    ],
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
