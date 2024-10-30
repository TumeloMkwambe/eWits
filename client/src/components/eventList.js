// src/components/eventList.js
import React from "react";

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="event">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default EventList;
