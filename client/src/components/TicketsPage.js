import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

// Styled-components for displaying tickets with improved design
const TicketsContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f9f9f9;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #003b5b;
`;

const TicketCard = styled.div`
  display: flex;
  flex-direction: row;
  background: linear-gradient(45deg, #3b5998, #8b9dc3);
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
`;

const EventInfo = styled.div`
  flex: 2;
  padding-right: 1rem;
`;

const EventTitle = styled.h3`
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
  color: #fff;
`;

const EventDetails = styled.p`
  margin-bottom: 0.4rem;
  font-size: 1rem;
  color: #ddd;
`;

const QRSection = styled.div`
  flex: 1;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  border-radius: 8px;
  margin-left: 0.8rem;
`;

const TicketPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffd700;
  margin-top: 0.8rem;
`;

const QRCodeContainer = styled.div`
  margin-top: 0.8rem;
`;

const PosterImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-top: 0.8rem;
`;

const BuyButton = styled.button`
  background-color: #ff4500;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;
  margin-top: 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #ff6347;
  }
`;

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
          throw new Error('User not found in session storage');
        }

        const registrationResponse = await axios.get(`${process.env.REACT_APP_API_URI}/api/user/${user._id}/tickets`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
        });

        const registrations = registrationResponse.data;
        const ticketData = [];

        for (const registration of registrations) {
          const eventResponse = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${registration.eventID}`, {
            headers: {
              'x-api-key': process.env.REACT_APP_API_KEY,
            },
          });
          const event = eventResponse.data;

          const hasGeneral = event.ticket.price.general !== undefined;
          const hasVIP = event.ticket.price.vip !== undefined;

          if (hasGeneral || hasVIP) {
            if (event.ticket.price.general === 0 && event.ticket.price.vip === 0) {
              ticketData.push({
                registration,
                event,
                type: null,
                price: 'Free',
              });
            } else {
              if (event.ticket.price.general !== 0) {
                ticketData.push({
                  registration,
                  event,
                  type: 'General',
                  price: event.ticket.price.general,
                });
              }
              if (event.ticket.price.vip !== 0) {
                ticketData.push({
                  registration,
                  event,
                  type: 'VIP',
                  price: event.ticket.price.vip,
                });
              }
            }
          } else {
            // If no ticket types exist
            ticketData.push({
              registration,
              event,
              type: null,
              price: 'Free',
            });
          }
        }

        setTickets(ticketData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleBuyTicket = (ticketType, price) => {
    alert(`Buying a ${ticketType} ticket for ${price}!`);
    // This function can redirect to a checkout page or handle the purchase flow.
  };

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  return (
    <TicketsContainer>
      <Heading>Tickets for your registered events</Heading>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <TicketCard key={index}>
            <EventInfo>
              <EventTitle>{ticket.event.name}</EventTitle>
              {ticket.event.poster && (
                <PosterImage src={ticket.event.poster} alt={`Poster for ${ticket.event.name}`} />
              )}
              <EventDetails><strong>Description:</strong> {ticket.event.description}</EventDetails>
              <EventDetails><strong>Date:</strong> {new Date(ticket.event.start_date).toLocaleString()} - {new Date(ticket.event.end_date).toLocaleString()}</EventDetails>
              <EventDetails><strong>Location:</strong> {ticket.event.location}</EventDetails>
              {ticket.type && (
                <EventDetails><strong>Ticket Type:</strong> {ticket.type}</EventDetails>
              )}
              <TicketPrice>{ticket.price === 'Free' ? ticket.price : `R ${ticket.price}`}</TicketPrice>
              {ticket.type && ticket.price !== 'Free' && (
                <BuyButton onClick={() => handleBuyTicket(ticket.type, `R ${ticket.price}`)}>
                  Buy {ticket.type} Ticket
                </BuyButton>
              )}
            </EventInfo>
            <QRSection>
              <QRCodeContainer>
                <QRCodeCanvas value={`Ticket for ${ticket.event.name} - ${ticket.price}`} size={100} />
              </QRCodeContainer>
            </QRSection>
          </TicketCard>
        ))
      ) : (
        <p>No tickets found for this user.</p>
      )}
    </TicketsContainer>
  );
};

export default TicketsPage;
