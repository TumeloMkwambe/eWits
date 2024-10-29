import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LogoutScreen from './logoutAnimation';

const Logout = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout({ logoutParams: { returnTo: process.env.CLIENT } });
       
        setTimeout(() => setIsLoggingOut(false), 2500);
      } catch (error) {
        console.error('Logout error:', error);
        setIsLoggingOut(false);
      }
    };

    performLogout();
  }, [logout]);

  useEffect(() => {
    if (!isLoggingOut) {
      navigate('/home'); 
    }
  }, [isLoggingOut, navigate]);

  return <div>{isLoggingOut ? <LogoutScreen /> : 'Redirecting...'}</div>;
};

export default Logout;
