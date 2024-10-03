
import React, { useState, useEffect } from "react";
import BuyTicketModal from "./BuyTicketModal"; // Import the modal component

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null); // State to hold selected event ID

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(`/events`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  // Function to handle "Buy" button click
  const handleBuyTicket = (eventId) => {
    setSelectedEventId(eventId); // Set the selected event ID
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEventId(null); // Reset selected event ID
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Registered Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Start Date:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(event.end_date).toLocaleDateString()}</p>
              <p><strong>Capacity:</strong> {event.capacity}</p>
              <img
                src={event.poster}
                alt={`${event.name} poster`}
                style={{ width: "200px", height: "auto" }}
              />
              <button onClick={() => handleBuyTicket(event._id)}>Buy</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
      
      {/* Render the Buy Ticket Modal */}
      <BuyTicketModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        eventId={selectedEventId}
      />
    </div>
  );
};

export default RegisteredEvents;
