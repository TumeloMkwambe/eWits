import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { fetchedEvents, fetchEvents } from '../Requests/events';

// Styled-components (same as before)
const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);`
;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  background-color: #f9f9f9;`
;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;`
;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;`
;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }`
;

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
  }`
;

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
  }`
;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 1rem;
  border-radius: 5px;`
;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }`
;
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
  const url = process.env.REACT_APP_VENUES_API;
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
    const navigate = useNavigate(); // Use navigate hook to redirect
    const [isEditing, setIsEditing] = useState(false); // Control editing state
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
        const fetchedEvent = await event(eventID);
        //console.log(fetchedEvent);
        // Format the date and time
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
          ticket: fetchedEvent.ticket.type === 'paid' ? {
            general: fetchedEvent.ticket.price.general,
            vip: fetchedEvent.ticket.price.vip 
          } : { general: fetchedEvent.ticket.price.general,
                vip: fetchedEvent.ticket.price.vip }
        };
       // console.log(formattedEvent);
  
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

      if (name.startsWith('ticket')) {
        const [_, priceType] = name.split('.'); // Get the price type (general or vip)
        setFormData({
          ...formData,
          ticket: {
            ...formData.ticket,
            [priceType]: value,
          },
        });
      } else if (name === 'location') {
        const selectedVenue = venues.find(venue => venue.Name === value);
        if (selectedVenue) {
          setFormData({
            ...formData,
            [name]: value,
            capacity: selectedVenue.Capacity,
          });
        }
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
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
      let posterUrl = formData.poster;
    
      // Handle file upload if poster is changed
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
    
      // Prepare event data
      const { title, description, event_type, location, capacity, firstname, lastname, email, start_date, end_date, start_time, end_time } = formData;
      const startDateArr = start_date.split("-");
      const startTimeArr = start_time.split(":");
      const endDateArr = end_date.split("-");
      const endTimeArr = end_time.split(":");
    
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
      };
    
      try {
        const createdEvent = await axios.put(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, event, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json',
          },
        }).then(response => {
          return response;
        });
    
        // Link event to user
        const myEvent = { entry: createdEvent.data._id };
        const userID = JSON.parse(sessionStorage.getItem('user'));
        await axios.put(`${process.env.REACT_APP_USER_URI}/api/users/event/${userID._id}`, myEvent, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await fetchEvents();
        
        // Redirect to the correct route
        navigate('/createdevents');  // Use '/createdevents' as the correct path
      } catch (error) {
        console.error(error);
      }
    };
    

    const handleDelete = async (e) => {
      e.preventDefault(); // Only needed if part of a form
  
      try {
          const response = await axios.delete(`${process.env.REACT_APP_API_URI}/api/events/${eventID}`, {
              headers: {
                  'x-api-key': process.env.REACT_APP_API_KEY,
                  'Content-Type': 'application/json'
              }
          });
          console.log('Event deleted successfully:', response.data);
      } catch (error) {
          console.error('Error deleting the event:', error);
      }
      window.history.back();
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
            value={formData.title}
            onChange={handleChange}
            disabled={isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isEditing}
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
            <option value="">Select Event Type</option>
            {eventTypes.map((type) => (
              <option value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            disabled={isEditing}
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
            disabled={isEditing}
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
            disabled={isEditing}
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
            disabled={isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Venue</Label>
          <Select
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={isEditing}
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
            disabled={isEditing}
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
            disabled={isEditing}
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
            disabled={isEditing}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Ticket Type</Label>
          <Select name="isPaid" value={formData.isPaid} onChange={handleChange}>
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
                name="ticket.general" // Correctly map to ticketPrices.general
                value={formData.ticket.general}
                onChange={handleChange}
                disabled={isEditing}
            />
            </FormGroup>

            <FormGroup>
            <Label>VIP Ticket Price</Label>
            <Input
                type="number"
                name="ticket.vip" // Correctly map to ticketPrices.vip
                value={formData.ticket.vip}
                onChange={handleChange}
                disabled={isEditing}
            />
            </FormGroup>

            </div>
        )}

        <FormGroup>
          <Label>Poster</Label>
          <Input
            type="file"
            name="poster"
            onChange={handleFileChange}
            disabled={isEditing}
          />
        </FormGroup>

        <Button type="button" onClick={handleEdit}>
          {isEditing ? 'Cancel Edit' : 'Edit Event'}
        </Button>
        {isEditing && <Button type="submit">Save Changes</Button> }
        
        {!isEditing ? <Button onClick={handleDelete}>Delete Event</Button> : null}
      </form>

      {formData.poster && <ImagePreview src={formData.poster} alt="Event Poster" />}
    </FormContainer>
  );
};

export default EventDetailsForm;