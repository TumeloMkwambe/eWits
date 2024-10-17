import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import '../globals.css'
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from './loadingAnimation';

const TicketsContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: transparent;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #003b5b;
  background-color: transparent;
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

const MissingEventCard = styled(TicketCard)`
  background: linear-gradient(45deg, #ff9966, #ff5e62);
`;

const MissingEventTitle = styled(EventTitle)`
  color: #fff;
`;

const MissingEventDetails = styled(EventDetails)`
  color: #fff;
`;

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'))
        console.log(user, 'This is the user for the tickets');
        if (!user || !user._id) {
          throw new Error('User not found in session storage or missing _id');
        }

        const userResponse = await axios.get(`${process.env.REACT_APP_USER_URI}/api/users/${user._id}`, {
          headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
        });

        const userData = userResponse.data;
        if (!userData.my_events || !Array.isArray(userData.my_events)) {
          throw new Error('Invalid user data received');
        }

        const ticketDataPromises = userData.my_events.map(async (eventId) => {
          try {
            const eventResponse = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${eventId}`, {
              headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
            });

            const event = eventResponse.data;
            if (!event) throw new Error(`Event not found for ID: ${eventId}`);

            let ticketInfo = { type: null, price: 'Free' };
            if (event.ticket && event.ticket.price) {
              const { general, vip } = event.ticket.price;
              if (general) ticketInfo = { type: 'General', price: general };
              else if (vip) ticketInfo = { type: 'VIP', price: vip };
            }

            return { event, ...ticketInfo };
          } catch {
            return { isMissing: true, eventId };
          }
        });

        const ticketData = await Promise.all(ticketDataPromises);
        setTickets(ticketData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleBuyTicket = (ticket) => {
    console.log('Ticket being passed to payment:', ticket);
    navigate('/payments', { state: { ticket } });
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='DashboardContainer'>
      <Sidebar />
      <div className='ContentArea'>
        <Heading>Your registered events</Heading>
        <TicketsContainer>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              ticket.isMissing ? (
                <MissingEventCard key={index}>
                  <EventInfo>
                    <MissingEventTitle>Event Information Unavailable</MissingEventTitle>
                    <MissingEventDetails>We couldn't retrieve information for this event (ID: {ticket.eventId}).</MissingEventDetails>
                  </EventInfo>
                </MissingEventCard>
              ) : (
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
                    <TicketPrice>{ticket.price === 'Free' ? 'Free' : `R${ticket.price}`}</TicketPrice>
                    {ticket.type && ticket.price !== 'Free' && (
                      <BuyButton onClick={() => handleBuyTicket(ticket)}>
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
              )
            ))
          ) : (
            <p>No registered events found for this user.</p>
          )}
        </TicketsContainer>
      </div>
    </div>
  );
};

export default TicketsPage;



// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { QRCodeCanvas } from 'qrcode.react';
// import '../globals.css';
// import Sidebar from './sidebar';
// import { useNavigate } from 'react-router-dom';

// // Styled-components for displaying tickets with improved design
// const TicketsContainer = styled.div`
//   max-width: 700px;
//   margin: 2rem auto;
//   padding: 1rem;
//   background-color: transparent;
// `;

// const Heading = styled.h2`
//   text-align: center;
//   font-size: 1.8rem;
//   margin-bottom: 1.5rem;
//   color: #003b5b;
// `;

// const TicketCard = styled.div`
//   display: flex;
//   flex-direction: row;
//   background: linear-gradient(45deg, #3b5998, #8b9dc3);
//   padding: 1rem;
//   margin-bottom: 1.5rem;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   color: white;
// `;

// const EventInfo = styled.div`
//   flex: 2;
//   padding-right: 1rem;
// `;

// const EventTitle = styled.h3`
//   margin-bottom: 0.8rem;
//   font-size: 1.4rem;
//   color: #fff;
// `;

// const EventDetails = styled.p`
//   margin-bottom: 0.4rem;
//   font-size: 1rem;
//   color: #ddd;
// `;

// const QRSection = styled.div`
//   flex: 1;
//   text-align: center;
//   background-color: rgba(255, 255, 255, 0.1);
//   padding: 0.8rem;
//   border-radius: 8px;
//   margin-left: 0.8rem;
// `;

// const TicketPrice = styled.div`
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: #ffd700;
//   margin-top: 0.8rem;
// `;

// const QRCodeContainer = styled.div`
//   margin-top: 0.8rem;
// `;

// const PosterImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   border-radius: 5px;
//   margin-top: 0.8rem;
// `;

// const BuyButton = styled.button`
//   background-color: #ff4500;
//   color: white;
//   padding: 0.4rem 0.8rem;
//   border: none;
//   border-radius: 8px;
//   margin-top: 0.8rem;
//   cursor: pointer;
//   font-size: 0.9rem;
  
//   &:hover {
//     background-color: #ff6347;
//   }
// `;

// const TicketsPage = () => {
//   const navigate = useNavigate();

//   // Sample data array
//   const sampleTickets = [
//     {
//       registration: { eventID: '12345', userID: 'user1' },
//       event: {
//         name: 'Music Concert',
//         description: 'A night filled with amazing performances.',
//         start_date: '2024-11-01T18:00:00',
//         end_date: '2024-11-01T23:00:00',
//         location: 'Stadium Arena',
//         ticket: { price: { general: 100, vip: 300 } },
//         poster: 'https://www.globaldisciples.ca/wp-content/uploads/2023/07/5-steps-to-powerful-intecessory-prayer-768x548.jpg'
//       },
//       type: 'General',
//       price: 100
//     },
//     {
//       registration: { eventID: '67890', userID: 'user2' },
//       event: {
//         name: 'Tech Conference',
//         description: 'The latest in technology and innovation.',
//         start_date: '2024-11-15T09:00:00',
//         end_date: '2024-11-15T17:00:00',
//         location: 'Convention Center',
//         ticket: { price: { general: 0, vip: 200 } },
//         poster: 'https://www.globaldisciples.ca/wp-content/uploads/2023/07/5-steps-to-powerful-intecessory-prayer-768x548.jpg'
//       },
//       type: 'VIP',
//       price: 200
//     },
//     {
//       registration: { eventID: '54321', userID: 'user3' },
//       event: {
//         name: 'Art Exhibition',
//         description: 'Showcasing modern art pieces from renowned artists.',
//         start_date: '2024-12-05T10:00:00',
//         end_date: '2024-12-05T18:00:00',
//         location: 'Art Gallery',
//         ticket: { price: { general: 50, vip: 100 } },
//         poster: 'https://www.globaldisciples.ca/wp-content/uploads/2023/07/5-steps-to-powerful-intecessory-prayer-768x548.jpg'
//       },
//       type: 'General',
//       price: 50
//     }
//   ];

//   const handleBuyTicket = (ticketType, price) => {
//     alert(`Buying a ${ticketType} ticket for ${price}!`);
//     navigate('/payments');
//   };

//   return (
//     <div className="DashboardContainer">
//       <Sidebar />
//       <div className="ContentArea">
//         <TicketsContainer>
//           <Heading>Tickets for your registered events</Heading>
//           {sampleTickets.length > 0 ? (
//             sampleTickets.map((ticket, index) => (
//               <TicketCard key={index}>
//                 <EventInfo>
//                   <EventTitle>{ticket.event.name}</EventTitle>
//                   {ticket.event.poster && (
//                     <PosterImage
//                       src={ticket.event.poster}
//                       alt={`Poster for ${ticket.event.name}`}
//                     />
//                   )}
//                   <EventDetails><strong>Description:</strong> {ticket.event.description}</EventDetails>
//                   <EventDetails><strong>Date:</strong> {new Date(ticket.event.start_date).toLocaleString()} - {new Date(ticket.event.end_date).toLocaleString()}</EventDetails>
//                   <EventDetails><strong>Location:</strong> {ticket.event.location}</EventDetails>
//                   {ticket.type && (
//                     <EventDetails><strong>Ticket Type:</strong> {ticket.type}</EventDetails>
//                   )}
//                   <TicketPrice>{ticket.price === 'Free' ? ticket.price : `R ${ticket.price}`}</TicketPrice>
//                   {ticket.type && ticket.price !== 'Free' && (
//                     <BuyButton onClick={() => handleBuyTicket(ticket.type, `R ${ticket.price}`)}>
//                       Buy {ticket.type} Ticket
//                     </BuyButton>
//                   )}
//                 </EventInfo>
//                 <QRSection>
//                   <QRCodeContainer>
//                     <QRCodeCanvas value={`Ticket for ${ticket.event.name} - ${ticket.price}`} size={100} />
//                   </QRCodeContainer>
//                 </QRSection>
//               </TicketCard>
//             ))
//           ) : (
//             <p>No tickets found for this user.</p>
//           )}
//         </TicketsContainer>
//       </div>
//     </div>
//   );
// };

// export default TicketsPage;