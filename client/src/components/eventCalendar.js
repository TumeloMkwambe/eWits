import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
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

const FilterInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 300px;
`;

const RadioGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #003b5b;
`;

const eventCalendar = async () => {
  const calendarEvents = [];
  await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY,
    },
  })
  .then(response => response.data)
  .then(data => {
    for (let i = 0; i < Object.keys(data).length; i++) {
      const calendarEvent = {
        title: data[i].name,
        start: new Date(data[i].start_date),
        end: new Date(data[i].end_date),
        type: data[i].event_type,
        location: data[i].location
      };
      calendarEvents.push(calendarEvent);
    }
  })
  .catch(error => console.error('Error fetching events:', error));
  return calendarEvents;
};

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('name'); // Default filter type is 'name'
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await eventCalendar();
        setEvents(eventsData);
        sessionStorage.setItem('calendar-events', JSON.stringify(eventsData));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const navigationType = performance.getEntriesByType('navigation')[0]?.type;

    if (navigationType === 'reload') {
      sessionStorage.removeItem('calendar-events');
    }

    const storedEvents = sessionStorage.getItem('calendar-events');

    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      fetchEvents();
    }
  }, []);

  useEffect(() => {
    // Filter events based on the selected filter type
    const filtered = events.filter(event => {
      if (filterType === 'name') {
        return event.title.toLowerCase().includes(filter.toLowerCase());
      } else if (filterType === 'day') {
        return (
          moment(event.start).format('YYYY-MM-DD') ===
          moment(filter).format('YYYY-MM-DD')
        );
      } else if (filterType === 'type') {
        return event.type?.toLowerCase().includes(filter.toLowerCase());
      }
      else if (filterType === 'location') {
        return event.location.toLowerCase().includes(filter.toLowerCase());
      }
      return true;
    });
    setFilteredEvents(filtered);
  }, [filter, filterType, events]);

  return (
    <CalendarContainer>
      <RadioGroup>
        <RadioLabel>
          <input
            type="radio"
            name="filterType"
            value="name"
            checked={filterType === 'name'}
            onChange={() => setFilterType('name')}
          />
          Name
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="filterType"
            value="day"
            checked={filterType === 'day'}
            onChange={() => setFilterType('day')}
          />
          Date
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="filterType"
            value="type"
            checked={filterType === 'type'}
            onChange={() => setFilterType('type')}
          />
          Type
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            name="filterType"
            value="location"
            checked={filterType === 'location'}
            onChange={() => setFilterType('location')}
          />
          Location
        </RadioLabel>
      </RadioGroup>
      <FilterInput
        type={filterType === 'day' ? 'date' : 'text'}
        placeholder={`Filter events by ${filterType}...`}
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <Calendar
        localizer={localizer}
        events={filteredEvents}
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
        onSelectSlot={slotInfo =>
          alert(`Selected slot: ${slotInfo.start} to ${slotInfo.end}`)
        }
      />
    </CalendarContainer>
  );
};

export default EventCalendar;
