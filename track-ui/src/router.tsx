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
import UserProfile from './pages/UserProfile/UserProfile';
import ResetPassword from './components/ResetPassword/ResetPassword';
import MyLists from './pages/MyLists/MyLists';
import ListDetails from './pages/ListDetails/ListDetails';
import LegalNotice from './pages/FooterPages/LegalNotice';
import PrivacyPolicy from './pages/FooterPages/PrivacyPolicy';
import About from './pages/FooterPages/About';

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
      {
        path: 'user-profile',
        element: <UserProfile />,
        children: [],
      },
      {
        path: 'mylists',
        element: <MyLists />,
        children: [],
      },
      {
        path: 'list/:id',
        element: <ListDetails />,
        children: [],
      },
      {
        path: 'legal-notice',
        element: <LegalNotice />,
        children: [],
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
        children: [],
      },
      {
        path: 'about',
        element: <About />,
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
      {
        path: 'reset-password',
        element: <ResetPassword />,
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
