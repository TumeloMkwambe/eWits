import React, { useState } from 'react';
import styled from 'styled-components';
import witsImage from '../../images/wits.png';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #f0f0f0, #d9d9d9);
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
    border-color: #333;
  }
`;

const Button = styled.button`
  background-color: #333;
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
    background-color: #555;
    transform: translateY(-3px);
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  background-color: #ececec;
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

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple validation
    if (!formData.firstName || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {  // Update this URL with your actual Azure function URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message); // Adjust based on the actual response structure
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <Card>
        <FormContainer>
          <Title>Create Account</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="firstName">First name*</Label>
              <Input type="text" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email*</Label>
              <Input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password*</Label>
              <Input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Create a password" />
            </FormGroup>
            <Button type="submit">Create Account</Button>
          </form>
          <Button style={{ backgroundColor: '#4285F4', marginTop: '1rem' }}>Continue with Google</Button>
        </FormContainer>
        <ImageContainer>
          <Image src={witsImage} alt="Login Illustration" />
        </ImageContainer>
      </Card>
    </LoginContainer>
  );
};

export default Signup;
