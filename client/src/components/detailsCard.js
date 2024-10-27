import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components';
import axios from 'axios';

// Styled-components for the card
const CardContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: rgba(249, 249, 249, 0.5); /* Increased transparency */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  background-color: rgba(249, 249, 249, 0.5); /* Increased transparency */
  color: #003b5b;
`;

const CardGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #85714e;
  font-weight: bold;
`;

const Text = styled.p`
  margin: 0.5rem 0;
  color: #555;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 1rem;
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

const formatTime = (date) => {
  date = new Date(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatDate = (date) => {
  date = new Date(date);
  if (isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DetailsCard = () => {
  const { eventID } = useParams(); // Get eventID from URL
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const event = async (eventID) => {
    const event = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });
    return event.data;
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      const fetchedEvent = await event(eventID);
      const formattedEvent = {
        ...fetchedEvent,
        start_time: formatTime(fetchedEvent.start_date),
        end_time: formatTime(fetchedEvent.end_date),
        start_date: formatDate(fetchedEvent.start_date),
        end_date: formatDate(fetchedEvent.end_date),
        firstname: fetchedEvent.creator.name,
        lastname: fetchedEvent.creator.surname,
        email: fetchedEvent.creator.email,
      };
      setFormData(formattedEvent);
    };

    fetchEventDetails();
  }, [eventID]);

  const handleRegisterClick = () => {
    navigate(`/events/${eventID}/register`); // Navigate to RegisterEvent.js page
  };

  return (
    <CardContainer>
      <CardTitle>Event Details</CardTitle>
      <CardGroup>
        {formData.poster ? (
          <ImagePreview src={formData.poster} alt="Event Poster" />
        ) : (
          <Text>No image available</Text>
        )}
      </CardGroup>

      <CardGroup>
        <Label className="details-card-label">Event Title</Label>
        <Text>{formData.name || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Description</Label>
        <Text>{formData.description || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Event Type</Label>
        <Text>{formData.event_type || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Start Date</Label>
        <Text>{formData.start_date || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Start Time</Label>
        <Text>{formData.start_time || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>End Date</Label>
        <Text>{formData.end_date || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>End Time</Label>
        <Text>{formData.end_time || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Venue</Label>
        <Text>{formData.location || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Capacity</Label>
        <Text>{formData.capacity || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Firstname</Label>
        <Text>{formData.firstname || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Lastname</Label>
        <Text>{formData.lastname || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Email</Label>
        <Text>{formData.email || 'N/A'}</Text>
      </CardGroup>

      {/* Register button that navigates to the registration page */}
      <Button onClick={handleRegisterClick}>Register</Button>
    </CardContainer>
  );
};

export default DetailsCard;
