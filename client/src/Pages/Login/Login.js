import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import witsImage from '../../images/wits.png';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ffecb3;
  padding: 2rem;
`;

const Card = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  position: relative;
`;

const FormContainer = styled.div`
  padding: 3rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
  color: #555555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  border-radius: 8px;
  border: 2px solid #ddd;
  font-size: 1rem;
  box-shadow: inset 0px 3px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f9a825;
  }
`;

const Button = styled.button`
  background-color: #f57c00;
  color: #fff;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ef6c00;
    transform: translateY(-3px);
  }
`;

const GoogleButton = styled.button`
  background-color: #ffffff;
  color: #4285F4;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    transform: translateY(-3px);
  }

  &::before {
    content: '';
    background: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg') no-repeat center center;
    background-size: contain;
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  background-color: #ffecb3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  transform: rotate(-5deg);
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('/api/login', {  // Replace with your actual API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        
        // Check if the response is JSON
        if (contentType && contentType.includes('application/json')) {
        await response.json();
          navigate('/dashboard');  // Redirect to Dashboard after login
        } else {
          const textResult = await response.text();  // If it's plain text, handle it as text
          console.log(textResult);
          // You can still redirect if the response indicates success
          navigate('/dashboard');
        }
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <LoginContainer>
      <Card>
        <FormContainer>
          <Title>Login</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email*</Label>
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password*</Label>
              <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </FormGroup>
            <Button type="submit">Login</Button>
          </form>
          <GoogleButton>Continue with Google</GoogleButton>
        </FormContainer>
        <ImageContainer>
          <Image src={witsImage} alt="Login Illustration" />
        </ImageContainer>
      </Card>
    </LoginContainer>
  );
};

export default Login;
