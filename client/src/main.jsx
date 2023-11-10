<<<<<<< HEAD
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { UserProvider } from './contexts/UserContext'; // Assuming you've implemented the UserProvider

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
=======
import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
>>>>>>> 445111b99d2fea91bc1a772bc206788370d5f166
