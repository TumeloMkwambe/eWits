import React from 'react';
import  { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

const localizer = momentLocalizer(moment);

const CalendarContainer = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 1200px;
`;

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        // Format events for react-big-calendar
        const formattedEvents = data.map(event => ({
          title: event.title,
          start: new Date(event.start), // assuming the event has a start date
          end: new Date(event.end),     // assuming the event has an end date
          allDay: event.allDay || false,
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
        step={60}
        showMultiDayTimes
        selectable
        popup
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={slotInfo => alert(`Selected slot: ${slotInfo.start} to ${slotInfo.end}`)}
      />
    </CalendarContainer>
  );
};

export default EventCalendar;
