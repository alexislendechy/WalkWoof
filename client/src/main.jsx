import ReactDOM from 'react-dom/client'
import React from 'react';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Singup';
import MyProfile from './pages/MyProfile.jsx';
import NoMatch from './pages/NoMatch.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },  
      {
        path: "/profile",
        element: <MyProfile />,
        errorElement: <h1 className="display-2">Wrong page!</h1>,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
