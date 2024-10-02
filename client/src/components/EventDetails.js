import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import '../../src/globals.css';
import Siderbar from './sidebar';

const DetailsContainer = styled.div`
  flex-direction: column;
  max-width: 800px;
  margin: 1rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.19);
`;

const EventImage = styled.img`
  width: 80%; 
  height: auto; 
  border-radius: 10px; 
  margin-bottom: 1rem; 
  display: block;
  margin: 0 auto;
`;

const EventTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #003366;
  margin-bottom: 1rem;
`;

const EventDetail = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-left: 5px solid #007bff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const DetailLabel = styled.h4`
  margin: 0;
  color: #555;
  font-weight: bold;
`;

const DetailValue = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  margin-top: 2rem; /* Space above buttons */
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 1rem; /* Space between buttons */

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled(ActionButton)`
  background-color: #dc3545; /* Red for close button */
  
  &:hover {
    background-color: #c82333;
  }
`;

const EventDetailsPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URI}/api/events/${id}`, {
            headers: {
              'x-api-key': process.env.REACT_APP_API_KEY,
            },
          });

          if (!response.ok) {
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('text/html')) {
              const errorText = await response.text();  // just for readability
              console.error('Received HTML error response:', errorText);
              throw new Error(`Failed to fetch event. Received an HTML page instead of JSON. Status: ${response.status}`);
            }
            
            throw new Error(`Failed to fetch event. Status: ${response.status}`);
          }

          const data = await response.json();
          setEvent(data); 
        } catch (err) {
          console.error('Error in fetchEvent:', err.message);
          setError(err.message || 'An error occurred while fetching the event.');
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }, [id]); 
  
    if (loading) return <p>Loading event details...</p>;
    if (error) return <p>Error loading event details: {error}</p>;
    if (!event) return <p>No event found.</p>;
  
    const creatorName = event.creator ? `${event.creator.name || ''} ${event.creator.surname || ''}`.trim() : 'Unknown';
    const creatorEmail = event.creator && event.creator.email ? event.creator.email : 'No email provided';
  
    return (
      <div className='DashboardContainer'>
        <Siderbar />
        <div className='ContentArea'>
          <DetailsContainer>
            {event.poster && <EventImage src={event.poster} alt={event.name || 'Event poster'} />}
            <EventTitle>{event.name || 'Unnamed Event'}</EventTitle>

            <EventDetail>
              <DetailLabel>Created By:</DetailLabel>
              <DetailValue>{`${creatorName} (${creatorEmail})`}</DetailValue>
            </EventDetail>

            <EventDetail>
              <DetailLabel>Date:</DetailLabel>
              <DetailValue>
                {event.start_date && event.end_date
                  ? `From ${new Date(event.start_date).toLocaleDateString()} to ${new Date(event.end_date).toLocaleDateString()}`
                  : 'Date not specified'}
              </DetailValue>
            </EventDetail>

            <EventDetail>
              <DetailLabel>Time:</DetailLabel>
              <DetailValue>
                {event.start_date && event.end_date
                  ? `${new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : 'Time not specified'}
              </DetailValue>
            </EventDetail>

            <EventDetail>
              <DetailLabel>Location:</DetailLabel>
              <DetailValue>{event.location || 'Location not specified'}</DetailValue>
            </EventDetail>

            <EventDetail>
              <DetailLabel>Event Description:</DetailLabel>
              <DetailValue>{event.description || 'No description provided'}</DetailValue>
            </EventDetail>

            <ButtonContainer>
              <ActionButton onClick={() => navigate(`/edit-event/${id}`)}>Edit Event</ActionButton>
              <ActionButton onClick={() => console.log('Delete Event action here')}>Delete Event</ActionButton>
              <CloseButton onClick={() => navigate('/myevents')}>
                Close
              </CloseButton>
            </ButtonContainer>
          </DetailsContainer>
        </div>
      </div>
    );
};

export default EventDetailsPage;
