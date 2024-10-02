import React, { useState, useEffect } from "react";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        // Fetch all events from the events collection
        const response = await fetch(`${process.env.REACT_APP_URI_RAT}/events`);
        
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
  }, []); // No dependency on userId needed

  // Function to handle "Buy" button click
  const handleBuyTicket = (eventId) => {
    alert(`You clicked "Buy" for event ID: ${eventId}`);
    // Logic to handle ticket purchasing can be implemented here
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
    </div>
  );
};

export default RegisteredEvents;