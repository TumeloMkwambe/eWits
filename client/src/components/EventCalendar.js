import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import axios from 'axios';

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
    // Check if events are stored in localStorage
    const storedEvents = localStorage.getItem('calendarEvents');
    
    if (storedEvents) {
      // If events are found in localStorage, use them
      setEvents(JSON.parse(storedEvents));
    } else {
      // Fetch events from API and store them in localStorage
      const fetchCalendarEvents = async () => {
        await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
          headers: {
            'x-api-key': process.env.REACT_APP_VENUES_API_KEY,
          },
        })
        .then(response => response.data)
        .then(data => {
          const calendarEvents = [];
          for (let i = 0; i < Object.keys(data).length; i++) {
            const calendarEvent = {
              title: data[i].name,
              start: new Date(data[i].start_date),
              end: new Date(data[i].end_date),
            };
            calendarEvents.push(calendarEvent);
          }
          // Set events to state and store them in localStorage
          setEvents(calendarEvents);
          localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
        })
        .catch(error => console.error('Error fetching events:', error));
      };
      
      fetchCalendarEvents();
    }
  }, []);

  return (
    <div className='DashboardContainer'>
      <Sidebar />
      <div className='ContentArea'>
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
      </div>
    </div>
  );
};

export default EventCalendar;
