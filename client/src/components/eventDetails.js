import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchedEvents, fetchEvents } from '../Requests/events';

// Styled-components (same as before)
const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: rgba(249, 249, 249, 0.5); // Increased transparency
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Retaining the shadow for depth
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

const fetchEvent = async (eventID) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

const availableVenues = async () => {
  const value = process.env.REACT_APP_VENUES_API_KEY;
  const url = process.env.REACT_APP_VENUES_API;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': value,
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const formatTime = (date) => {
  date = new Date(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatDate = (date) => {
  date = new Date(date);
  if (isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EventDetailsForm = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    ticket: { general: '', vip: '' },
    isPaid: 'free',
  });
  const [venues, setVenues] = useState([]);

  const eventTypes = [
    'Sports',
    'Religion',
    'Education',
    'Music',
    'Arts and Culture',
    'Business and Networking',
    'Food and Drink',
    'Community and Social',
    'Health and Wellness',
    'Charity and Fundraising',
    'Technology',
    'Family',
  ];

  useEffect(() => {
    const fetchEventDetails = async () => {
      const fetchedEvent = await fetchEvent(eventID);
      const formattedEvent = {
        ...fetchedEvent,
        title: fetchedEvent.name,
        start_time: formatTime(fetchedEvent.start_date),
        end_time: formatTime(fetchedEvent.end_date),
        start_date: formatDate(fetchedEvent.start_date),
        end_date: formatDate(fetchedEvent.end_date),
        firstname: fetchedEvent.creator.name,
        lastname: fetchedEvent.creator.surname,
        email: fetchedEvent.creator.email,
        isPaid: fetchedEvent.ticket.type,
        ticket: fetchedEvent.ticket.type === 'paid'
          ? {
              general: fetchedEvent.ticket.price.general,
              vip: fetchedEvent.ticket.price.vip,
            }
          : {
              general: fetchedEvent.ticket.price.general,
              vip: fetchedEvent.ticket.price.vip,
            },
      };

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

    if (name.startsWith('ticket')) {
      const [_, priceType] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        ticket: {
          ...prev.ticket,
          [priceType]: value,
        },
      }));
    } else if (name === 'location') {
      const selectedVenue = venues.find((venue) => venue.Name === value);
      if (selectedVenue) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          capacity: selectedVenue.Capacity,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      poster: file,
    }));
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let posterUrl = formData.poster;

    if (formData.poster instanceof File) {
      const formDataImg = new FormData();
      formDataImg.append('image', formData.poster);
      try {
        const response = await axios.post(`${process.env.REACT_APP_STORAGE_URI}/api/storage/upload`, formDataImg, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImageUrl(response.data.imageUrl);
        posterUrl = response.data.imageUrl;
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }

    const {
      title,
      description,
      event_type,
      location,
      capacity,
      firstname,
      lastname,
      email,
      start_date,
      end_date,
      start_time,
      end_time,
    } = formData;
    
    const startDateArr = start_date.split('-');
    const startTimeArr = start_time.split(':');
    const endDateArr = end_date.split('-');
    const endTimeArr = end_time.split(':');

    const event = {
      name: formData.title,
      description,
      start_date: new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2], startTimeArr[0], startTimeArr[1]),
      end_date: new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2], endTimeArr[0], endTimeArr[1]),
      location,
      event_type,
      poster: posterUrl,
      capacity,
      likes: 0,
      creator: {
        name: firstname,
        surname: lastname,
        email,
      },
      ticket: {
        type: formData.isPaid,
        price: formData.ticket,
      },
      messages: [
        {
          content: `You edited the event "${formData.title}" on this day ${new Date().toLocaleDateString()}`,
          date: new Date(),
        },
      ],
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, event, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
      });
      console.log('Event updated successfully');
      fetchEvents(); // Refresh the events list or handle accordingly
      navigate(`/createdEvents`); // Redirect after successful submission
    } catch (error) {
      console.error('Error updating event', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const message = {
        content: `You deleted the event "${formData.title}" on this day ${new Date().toLocaleDateString()}`,
        date: new Date(),
      };

      try {
        await axios.delete(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          data: { messages: [message] }, // Sending message as part of the request
        });
        console.log('Event deleted successfully');
        fetchEvents(); // Refresh the events list or handle accordingly
        navigate('/createdEvents'); // Redirect after deletion
      } catch (error) {
        console.error('Error deleting event', error);
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>{isEditing ? 'Edit Event' : 'Edit Event Details'}</FormTitle>
      <form onSubmit={handleSubmit}>
        {/* Form fields (same as before) */}
        <FormGroup>
          <Label>Event Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            readOnly={isEditing}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Event Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            readOnly={isEditing}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Event Type</Label>
          <Select
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            disabled={isEditing}
            required
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Location</Label>
          <Select
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={isEditing}
            required
          >
            {venues.map((venue) => (
              <option key={venue.Name} value={venue.Name}>
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
            onChange={handleChange}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            readOnly={isEditing}
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
            readOnly={isEditing}
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
            readOnly={isEditing}
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
            readOnly={isEditing}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Ticket Type</Label>
          <Select
            name="isPaid"
            value={formData.isPaid}
            onChange={handleChange}
            disabled={isEditing}
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </Select>
        </FormGroup>
        {formData.isPaid === 'paid' && (
          <div>
            <FormGroup>
              <Label>General Ticket Price</Label>
              <Input
                type="number"
                name="ticket.general"
                value={formData.ticket.general}
                onChange={handleChange}
                readOnly={isEditing}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>VIP Ticket Price</Label>
              <Input
                type="number"
                name="ticket.vip"
                value={formData.ticket.vip}
                onChange={handleChange}
                readOnly={isEditing}
                required
              />
            </FormGroup>
          </div>
        )}
        <FormGroup>
          <Label>Event Poster</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isEditing}
          />
          {imageUrl && <ImagePreview src={imageUrl} alt="Event Poster Preview" />}
        </FormGroup>
        <>
        <Button type="submit">{isEditing ? 'Save Changes' : 'Edit'}</Button>
        <Button onClick={handleDelete} style={{ backgroundColor: 'red', marginTop: '1rem' }}>
          Delete Event
        </Button>
        </>
        
      </form>
    </FormContainer>
  );
};

export default EventDetailsForm;
