import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Styled-components for the card
const CardContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
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
  // Get the hours and minutes
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Combine the hours and minutes into a string
  const time = `${hours}:${minutes}`;

  return time;

}

const formatDate = (date) => {
  date = new Date(date);
  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    return ''; // Return an empty string for invalid dates
  }

  // Get the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  // Combine the year, month, and day into a string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const DetailsCard = () => {

  const { eventID } = useParams();
    const [formData, setFormData] = useState({});

    const event = async (eventID) => {
        const event = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        })
        return event.data;
  };

    useEffect(() => {
        const fetchEventDetails = async () => {
          const fetchedEvent = await event(eventID);
          
          // Format the date and time
          const formattedEvent = {
            ...fetchedEvent,
            start_time: formatTime(fetchedEvent.start_date),
            end_time: formatTime(fetchedEvent.end_date),
            start_date: formatDate(fetchedEvent.start_date),
            end_date: formatDate(fetchedEvent.end_date),
            firstname: fetchedEvent.creator.name,
            lastname: fetchedEvent.creator.surname,
            email: fetchedEvent.creator.email
          };
          
          // Set formData to the fetched and formatted event data
          setFormData(formattedEvent);
        };
      
        fetchEventDetails();
      }, [eventID]);

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
        <Label className='details-card-label'>Event Title</Label>
        <Text>{formData.name || 'N/A'}</Text>
      </CardGroup>

      <CardGroup>
        <Label>Description</Label>
        <Text>{formData.description || 'N/A'}</Text>
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
      <Button>Register</Button>
    </CardContainer>
  );
};

export default DetailsCard;
