// src/components/displayEvents.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DisplayEvents = ({ filteredEvents, route }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAndFilterEvents = async () => {
    setLoading(true);
    const eventsData = await filteredEvents();
    setEvents(eventsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAndFilterEvents();
  }, [filteredEvents]);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="past-events">
      {events.map((event) => (
        <div key={event.id}>
          <Link to={`/${route}/${event.id}`} className="event">
            <img src={event.img} alt={`Event ${event.id}`} />
            <div className="event-topic">{event.topic}</div>
            <div className="event-span">
              <p>{event.date}</p>
              <p>{event.time}</p>
              <p>{event.location}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DisplayEvents;
