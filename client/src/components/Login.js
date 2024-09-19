import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import witsImage from '../../src/images/wits.png';
import useAxiosInterceptor from '../utils/axios'; 

import '../../src/globals.css';


const LoginButton = () => {
  useAxiosInterceptor()

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


// import React, { useEffect } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from 'react-router-dom';
// import witsImage from '../../src/images/wits.png';
// // import jwtDecode from 'jwt-decode';
// import '../../src/globals.css';
// import useAxiosInterceptor from '../utils/axios'; 

// const LoginButton = () => {
//   useAxiosInterceptor()
//   const { loginWithRedirect, isAuthenticated, isLoading, getIdTokenClaims, error } = useAuth0();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // setName(jwtDecode().username)
//     if (error) {
//       console.error("Error during Auth0 authentication:", error);
//     }
//   }, [error]);

//   useEffect(() => {
//     const fetchToken = async () => {
//       if (isAuthenticated) {
//         console.log("User is authenticated.");
//         try {
//           const token = await getIdTokenClaims();
//           console.log("Token object:", token); // Log the entire token object
//           if (token && token.__raw) {
//             console.log("ID Token:", token.__raw); // Log raw token if available
//           } else {
//             console.log("Token.__raw is not available.");
//           }
//         } catch (error) {
//           console.error("Error retrieving token:", error);
//         }
//       }
//     };
//     fetchToken();
//   }, [isAuthenticated, getIdTokenClaims]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log("Navigating to /home");
//       navigate('/home');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className="container-center">
//       {isLoading ? (
//         <div className="spinner-container">
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <div className="card">
//           <div className="form-container">
//             <span className="login">Login</span>
//             <button className="button" onClick={() => loginWithRedirect()}>
//               Log In
//             </button>
//           </div>
//           <div className="image-container">
//             <img src={witsImage} alt="Login Illustration" className="image" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginButton;
