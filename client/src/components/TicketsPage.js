// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Sidebar from './sidebar';
// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigateimport backgroundImage from '../images/2.jpg'; // Import your background image

// // Styled-components
// const DashboardContainer = styled.div`
//   display: flex;
//   height: 100vh; /* Full height to enable scrolling */
//   overflow: hidden;
 
//   background-size: cover; /* Cover the entire container */
//   background-position: center; /* Center the image */
// `;

// const SidebarContainer = styled.div`
//   flex: 0 0 250px; /* Fixed width for sidebar */
//   position: fixed; /* Keep sidebar fixed */
//   height: 100%; /* Full height */
//   overflow-y: auto; /* Enable scrolling for sidebar if needed */
//   background-color: white; /* Set sidebar background color to white */
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
// `;

// const TicketsContainer = styled.div`
//   margin-left: 250px; /* Space for the fixed sidebar */
//   padding: 1rem;
//   overflow-y: auto; /* Allow scrolling in this area */
//   flex: 1; /* Take up the remaining space */
//   background-color: rgba(249, 249, 249, 0.8); /* Light background with transparency */
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
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const user = JSON.parse(sessionStorage.getItem('user'));
//         if (!user) {
//           throw new Error('User not found in session storage');
//         }

//         const registrationResponse = await axios.get(`${process.env.REACT_APP_API_URI}/api/user/${user._id}/tickets`, {
//           headers: {
//             'x-api-key': process.env.REACT_APP_API_KEY,
//           },
//         });

//         const registrations = registrationResponse.data;
//         const ticketData = [];

//         for (const registration of registrations) {
//           const eventResponse = await axios.get(`${process.env.REACT_APP_API_URI}/api/events/${registration.eventID}`, {
//             headers: {
//               'x-api-key': process.env.REACT_APP_API_KEY,
//             },
//           });
//           const event = eventResponse.data;

//           const hasGeneral = event.ticket.price.general !== undefined;
//           const hasVIP = event.ticket.price.vip !== undefined;

//           if (hasGeneral || hasVIP) {
//             if (event.ticket.price.general === 0 && event.ticket.price.vip === 0) {
//               ticketData.push({
//                 registration,
//                 event,
//                 type: null,
//                 price: 'Free',
//               });
//             } else {
//               if (event.ticket.price.general !== 0) {
//                 ticketData.push({
//                   registration,
//                   event,
//                   type: 'General',
//                   price: event.ticket.price.general,
//                 });
//               }
//               if (event.ticket.price.vip !== 0) {
//                 ticketData.push({
//                   registration,
//                   event,
//                   type: 'VIP',
//                   price: event.ticket.price.vip,
//                 });
//               }
//             }
//           } else {
//             ticketData.push({
//               registration,
//               event,
//               type: null,
//               price: 'Free',
//             });
//           }
//         }

//         setTickets(ticketData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching tickets:', error);
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, []);

//   const handleBuyTicket = (ticket) => {
//     // Navigate to the payment page and pass ticket data via location.state
//     navigate('/payments', { state: { ticket } });
//   };

//   return (
//     <DashboardContainer>
//       <SidebarContainer>
//         <Sidebar />
//       </SidebarContainer>
//       <TicketsContainer>
//         <Heading>Tickets for your registered events</Heading>
//         {loading ? (
//           <p>Loading...</p>
//         ) : tickets.length > 0 ? (
//           tickets.map((ticket, index) => (
//             <TicketCard key={index}>
//               <EventInfo>
//                 <EventTitle>{ticket.event.name}</EventTitle>
//                 {ticket.event.poster && (
//                   <PosterImage src={ticket.event.poster} alt={`Poster for ${ticket.event.name}`} />
//                 )}
//                 <EventDetails><strong>Description:</strong> {ticket.event.description}</EventDetails>
//                 <EventDetails><strong>Date:</strong> {new Date(ticket.event.start_date).toLocaleString()} - {new Date(ticket.event.end_date).toLocaleString()}</EventDetails>
//                 <EventDetails><strong>Location:</strong> {ticket.event.location}</EventDetails>
//                 {ticket.type && (
//                   <EventDetails><strong>Ticket Type:</strong> {ticket.type}</EventDetails>
//                 )}
//                 <TicketPrice>{ticket.price === 'Free' ? ticket.price : `R ${ticket.price}`}</TicketPrice>
//                 {ticket.type && ticket.price !== 'Free' && (
//                   <BuyButton onClick={() => handleBuyTicket(ticket)}>
//                     Buy {ticket.type} Ticket
//                   </BuyButton>
//                 )}
//               </EventInfo>
//               <QRSection>
//                 <QRCodeContainer>
//                   <QRCodeCanvas value={`Ticket for ${ticket.event.name} - ${ticket.price}`} size={100} />
//                 </QRCodeContainer>
//               </QRSection>
//             </TicketCard>
//           ))
//         ) : (
//           <p>No tickets found for this user.</p>
//         )}
//       </TicketsContainer>
//     </DashboardContainer>
//   );
// };

// export default TicketsPage;






import React from 'react';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import '../globals.css';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';

// Styled-components for displaying tickets with improved design
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

// Main TicketsPage Component
const TicketsPage = () => {
  const navigate = useNavigate();

  // Sample data array for accumulating ticket sales
  const sampleTickets = [
    {
      registration: { eventID: '12345', userID: 'user1' },
      event: {
        name: 'Music Concert',
        description: 'A night filled with amazing performances.',
        start_date: '2024-11-01T18:00:00',
        end_date: '2024-11-01T23:00:00',
        location: 'Stadium Arena',
        ticket: { price: { general: 100, vip: 300 } },
        poster: 'https://example.com/music_concert.jpg',
      },
      type: 'General',
      price: 100,
    },
    {
      registration: { eventID: '12345', userID: 'user2' },
      event: {
        name: 'Music Concert',
        description: 'A night filled with amazing performances.',
        start_date: '2024-11-01T18:00:00',
        end_date: '2024-11-01T23:00:00',
        location: 'Stadium Arena',
        ticket: { price: { general: 100, vip: 300 } },
        poster: 'https://example.com/music_concert.jpg',
      },
      type: 'VIP',
      price: 300,
    },
  ];

  const handleBuyTicket = (ticket) => {
    navigate('/payments', { state: { ticket } });
  };

  return (
    <div className="DashboardContainer">
      <Sidebar />
      <TicketsContainer>
        <Heading>My Tickets</Heading>
        {sampleTickets.map((ticket, index) => (
          <TicketCard key={index}>
            <EventInfo>
              <EventTitle>{ticket.event.name} ({ticket.type})</EventTitle>
              <EventDetails>
                {ticket.event.description} <br />
                Location: {ticket.event.location} <br />
                Date: {new Date(ticket.event.start_date).toLocaleString()} - {new Date(ticket.event.end_date).toLocaleString()}
              </EventDetails>
              <TicketPrice>Price: R{ticket.price}</TicketPrice>
              <BuyButton onClick={() => handleBuyTicket(ticket)}>Buy Ticket</BuyButton>
            </EventInfo>
            <QRSection>
              <QRCodeContainer>
                <QRCodeCanvas value={`https://example.com/ticket/${ticket.registration.eventID}`} size={128} />
              </QRCodeContainer>
              <PosterImage src={ticket.event.poster} alt={`${ticket.event.name} poster`} />
            </QRSection>
          </TicketCard>
        ))}
      </TicketsContainer>
    </div>
  );
};

export default TicketsPage;
