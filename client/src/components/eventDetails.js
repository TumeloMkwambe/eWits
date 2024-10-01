import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Styled-components (same as before)
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
  color: #333;
  background-color: #f9f9f9;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-height: 120px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
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

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 1rem;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
const event = async (eventID) => {
  const event = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY
    }
  })
  return event.data;
};

const availableVenues = async () => {
  let venues;
  const value = process.env.REACT_APP_VENUES_API_KEY;
  const url = `${process.env.REACT_APP_VENUES_API}`;
  await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': value,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then( data => {
      venues = data;
    })
    .catch(error => console.error('Error:', error.message));
  return venues;
}

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

const EventDetailsForm = () => {
  const { eventID } = useParams();
  const [isEditing, setIsEditing] = useState(false); // Control editing state
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({});

  const [venues, setVenues] = useState([]);

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
      console.log(formData);
      // Set formData to the fetched and formatted event data
      setFormData(formattedEvent);
    };
  
    const fetchVenues = async () => {
      const venuesData = await availableVenues();
      setVenues(venuesData);
    };
  
    fetchEventDetails();
    fetchVenues();
  }, [eventID]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      poster: file,
    });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (same as before)
  };

  return (
    <FormContainer>
      <FormTitle>Event Details</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Event Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Start Time</Label>
          <Input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>End Date</Label>
          <Input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>End Time</Label>
          <Input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Venue</Label>
          <Select
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={!isEditing}
            required
          >
            <option value="">Select a location</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.Name}>
                {venue.Name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Capacity</Label>
          <Input
            type="number"
            name="capacity"
            value={formData.capacity}
            readOnly
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Firstname</Label>
          <Input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Lastname</Label>
          <Input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            disabled={!isEditing}
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
            disabled={!isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Poster</Label>
          <Input
            type="file"
            name="poster"
            onChange={handleFileChange}
            disabled={!isEditing}
          />
        </FormGroup>

        <Button type="button" onClick={handleEdit}>
          {isEditing ? 'Cancel Edit' : 'Edit Event'}
        </Button>
        {isEditing && <Button type="submit">Save Changes</Button>}
      </form>

      {formData.poster && <ImagePreview src={formData.poster} alt="Event Poster" />}
    </FormContainer>
  );
};

export default EventDetailsForm;
