import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Styled-components for the form
const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: rgba(249, 249, 249, 0.5); /* Increased transparency */
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
  const [isRegistered, setIsRegistered] = useState(false); // Track if the user is already registered
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const checkRegistration = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user) {
        alert('User not found. Please log in again.');
        return;
      }

      try {
        // Make a request to check if the user has already registered for the event
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${eventID}/register/`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          }
        });

        if (response.data.isRegistered) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error('Error checking registration:', error);
      }
    };

    checkRegistration();
  }, [eventID]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistered) {
      alert('You have already registered for this event.');
      return;
    }

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user) {
        throw new Error('User not found in session storage');
      }

      const registrationData = {
        ...formData,
        creator: {
          name: user.name,
          surname: user.surname || 'N/A',
          email: user.email,
        },
        userID: user._id,
        eventID: eventID
      };

      console.log('Sending registration data:', registrationData);

      // Make the API call to register the user
      await axios.post(`${process.env.REACT_APP_API_URI}/api/events/${eventID}/register`, registrationData, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });

      alert('Registration successful!');
      // Redirect to TicketsPage after successful registration
      navigate('/tickets'); // Replace '/tickets' with your actual route for TicketsPage
    } catch (error) {
      console.error(error);
      alert('You have already registered for this event.');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Register for Event</FormTitle>
      {isRegistered ? (
        <p>You have already registered for this event.</p>
      ) : (
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
      )}
    </FormContainer>
  );
};

export default RegisterEvent;
