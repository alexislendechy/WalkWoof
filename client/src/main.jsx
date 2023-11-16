import ReactDOM from "react-dom/client";
import React, { useContext } from "react";
import { createBrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from './pages/Home';
import OwnerDashboard from './pages/Dashboards/OwnerDashboard';
import WalkerDashboard from './pages/Dashboards/WalkerDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import MyProfile from './pages/MyProfile.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import Payments from './pages/Payments';
import AuthContext from './context/AuthContext';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Check if the user has the required role
  if (roles && !roles.includes(authContext.user.role)) {
    // Redirect to unauthorized page or home
    return <Navigate to="/" />;
  }

  // Render the protected element
  return <Route element={<Element />} {...rest} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/results',
        element: <SearchResults />
      },
      {
        path: '/user/owner',
        element: <ProtectedRoute element={OwnerDashboard} roles={['owner']} />
      },
      {
        path: '/user/walker',
        element: <ProtectedRoute element={WalkerDashboard} roles={['walker']} />
      },
      {
        path: '/user/admin',
        element: <ProtectedRoute element={AdminDashboard} roles={['admin']} />
      },
      {
        path: '/payments',
        element: <ProtectedRoute element={Payments} roles={['owner', 'walker']} />
      },
      {
        path: "/profile",
        element: <MyProfile />,
        errorElement: <h1 className="display-2">Wrong page!</h1>,
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