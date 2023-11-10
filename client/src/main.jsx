
import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from './pages/Home';
import Owner from './pages/Dashboards/Owner';
import Walker from './pages/Dashboards/Walker';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import Payments from './pages/Payments';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
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
      }, {
        path: '/results',
        element: <SearchResults />
      }, {
        path: '/user/owner',
        element: <Owner/>
      },
      {
        path: '/user/walker',
        element: <Walker/>
      },
      {
        path: '/payments',
        element: <Payments />
      },
      {
        path: "/",
        element: <App />,
        errorElement: <h1 className="display-2">Wrong page!</h1>,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
git 
