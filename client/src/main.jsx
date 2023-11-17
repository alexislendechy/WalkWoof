import ReactDOM from 'react-dom/client'
import React from 'react';
import './index.css'
import { createBrowserRouter, RouterProvider, Routes, Navigate } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
//import OwnerDashboard from './pages/Dashboards/Owner';
//import WalkerDashboard from './pages/Dashboards/Walker';
//import AdminDashboard from './pages/Dashboards/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch.jsx';
import MyProfile from './pages/MyProfile.jsx';
//import SearchResults from './pages/SearchResults';
//import Payments from './pages/Payments';
import AuthContext from './Contexts/AuthContext';

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
