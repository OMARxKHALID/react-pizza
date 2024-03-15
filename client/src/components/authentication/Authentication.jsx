// Authentication.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import credentials from '../../credentials.json';

function Authentication({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const authenticate = (username, password) => {
    const isValidUser = credentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (isValidUser) {
      setAuthenticated(true);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      {authenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <LoginForm onLogin={authenticate} />
      )}
      {authenticated && children}
    </div>
  );
}

export default Authentication;
