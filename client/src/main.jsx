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