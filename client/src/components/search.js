import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './searchBar';
import EventDetailsCard from './upcomingEvents';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      setEvents(response.data);
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(query.toLowerCase()) ||
    event.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="event-list">
        {filteredEvents.map(event => (
          <EventDetailsCard />
        ))}
      </div>
    </div>
  );
};

export default EventList;
