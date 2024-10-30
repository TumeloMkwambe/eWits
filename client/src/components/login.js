import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../globalStyle.css";
import axios from "axios";

const postUser = async (name, email) => {
  const user = {
    name: name,
    email: email,
    liked_events: [],
    my_events: [],
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_USER_URI}/api/users/create`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    sessionStorage.setItem("user", JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.error("Failed to post user:", error);
    return { status: 500 }; // Return a default response if error occurs
  }
};

const Login = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      if (isAuthenticated && user) {
        // Wait for postUser to finish before navigating
        const response = await postUser(user.name, user.email);
        if (response.status === 200) {
          navigate("/home");
        }
      }
    };
    handleLogin();
  }, [isAuthenticated, user, navigate]);

  return (
    <div>
      <button onClick={() => loginWithRedirect()} className="Login">
        Log In
      </button>
    </div>
  );
};

export default Login;
