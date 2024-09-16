import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {

      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {/* <h2>Welcome! Please log in.</h2> */}
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
  
};

export default LoginButton;