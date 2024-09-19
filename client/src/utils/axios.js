import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const useAxiosInterceptor = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        const token = await getAccessTokenSilently();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(token)
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

   
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      console.log(requestInterceptor)
    };
  }, [getAccessTokenSilently]);
};

export default useAxiosInterceptor;
