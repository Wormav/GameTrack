import React, { Children } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import SignIn from './components/Auth/components/SignIn/SignIn';
import SignUp from './components/Auth/components/Signup/Signup';
import Error404 from './components/Error404/Error404';
import Home from './pages/Home';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: [],
        loader: () => {
            const isLogged = false;
            if (!isLogged)
                redirect("/auth/signin")
        }
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "/signin",
                element: <SignIn />,
                children: []
            },
            {
                path: "/signup",
                element: <SignUp />,
                children: []
            }

        ]
    },
    {
        path: "/404",
        element: <Error404 />,
        children: []
    }
])