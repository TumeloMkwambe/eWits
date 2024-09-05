import React from 'react';
import styled from 'styled-components';
import witsImage from '../../images/wits.png';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ffecb3;  /* Vibrant event-themed background */
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
    border-color: #f9a825;  /* Matching focus color with the event theme */
  }
`;

const Button = styled.button`
  background-color: #f57c00;  /* Event-themed button color */
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
    background-color: #ef6c00;  /* Slightly darker on hover */
    transform: translateY(-3px);
  }
`;

const GoogleButton = styled.button`
  background-color: #ffffff;  /* White background for Google button */
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
    background-color: #f1f1f1;  /* Slight hover effect */
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
  background-color: #ffecb3;  /* Light event-themed background */
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
  return (
    <LoginContainer>
      <Card>
        <FormContainer>
          <Title>Login</Title>

          <FormGroup>
            <Label htmlFor="firstName">First name*</Label>
            <Input type="text" id="firstName" placeholder="Enter your first name" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email*</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password*</Label>
            <Input type="password" id="password" placeholder="Create a password" />
          </FormGroup>
          <Button>Login</Button>
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
