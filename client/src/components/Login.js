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
    <div className="container-center">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="card">
          <div className="form-container">
            <span className="login">Login</span>
            <button className="button" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          </div>
          <div className="image-container">
            <img src={witsImage} alt="Login Illustration" className="image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;


