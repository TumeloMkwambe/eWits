import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Styled-components for the form
const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #003b5b;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #85714e;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #003b5b;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #85714e;
  }
`;

const RegisterEvent = () => {
  const { eventID } = useParams(); // Get eventID from URL
  const [formData, setFormData] = useState({
    fullName: '',
    studentNumber: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    console.log('Event ID:', eventID);
  }, [eventID]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user) {
        throw new Error('User not found in session storage');
      }

      const registrationData = {
        ...formData,
        creator: {
          name: user.name,  // Pass name from session storage
          surname: user.surname || "N/A",  // Surname is required in the schema
          email: user.email,  // Pass email from session storage
        },
        userID: user._id,  // Add user ID from session storage
        eventID: eventID   // Include the eventID
      };

      console.log('Sending registration data:', registrationData);

      await axios.post(`${process.env.REACT_APP_API_URI}/api/events/${eventID}/register`, registrationData, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });

      alert('Registration successful!');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Register for Event</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label>Student Number</Label>
          <Input 
            type="text" 
            name="studentNumber" 
            value={formData.studentNumber} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        <Button type="submit">Register</Button>
      </form>
    </FormContainer>
  );
};

export default RegisterEvent;

