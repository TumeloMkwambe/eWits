import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import witsImage from '../../src/images/wits.png';
import '../../src/globals.css';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0(); 
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Welcome! Please log in.</h2>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginButton;
