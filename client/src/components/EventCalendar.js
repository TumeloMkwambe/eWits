// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import styled from 'styled-components';

// import axios from 'axios';

// const localizer = momentLocalizer(moment);

// const CalendarContainer = styled.div`
//   padding: 2rem;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   margin: 2rem auto;
//   max-width: 1200px;
// `;

// const eventCalendar = async () => {
//   const calendarEvents = [];
//   await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
//     headers: {
//       'x-api-key': process.env.REACT_APP_API_KEY,
//     },
//   })
//   .then(response => response.data)
//   .then(data => {
//     for (let i = 0; i < Object.keys(data).length; i++) {
//       const calendarEvent = {
//         title: data[i].name,
//         start: new Date(data[i].start_date),
//         end: new Date(data[i].end_date),
//       };
//       calendarEvents.push(calendarEvent);
//     }
//   })
//   .catch(error => console.error('Error fetching events:', error));
//   return calendarEvents;
// };

// const EventCalendar = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//         try {
//             const eventsData = await eventCalendar();
//             setEvents(eventsData);
//             sessionStorage.setItem('calendar-events', JSON.stringify(eventsData))
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         }
//     };

//     const navigationType = performance.getEntriesByType('navigation')[0]?.type;

//     if (navigationType === 'reload') {
//         sessionStorage.removeItem('calendar-events');
//     }

//     const storedEvents = sessionStorage.getItem('calendar-events');

//     if (storedEvents) {
//         setEvents(JSON.parse(storedEvents));
//     } else {
//         fetchEvents();
//     }
//   }, []);

//   return (
//         <CalendarContainer>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500 }}
//             defaultView="month"
//             views={['month', 'week', 'day', 'agenda']}
//             step={60}
//             showMultiDayTimes
//             selectable
//             popup
//             onSelectEvent={event => alert(event.title)}
//             onSelectSlot={slotInfo => alert(`Selected slot: ${slotInfo.start} to ${slotInfo.end}`)}
//           />
//         </CalendarContainer>
//   );
// };

// export default EventCalendar;

import React, { useState, useEffect } from 'react';
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

const eventCalendar = async () => {
  const calendarEvents = [];
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URI_EMAPI}/events`, {
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    // Ensure the response is OK and convert to JSON
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Convert response to JSON

    // Check if data is an array before processing
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const calendarEvent = {
          title: data[i].name,
          start: new Date(data[i].start_date),
          end: new Date(data[i].end_date),
        };
        calendarEvents.push(calendarEvent);
      }
    } else {
      console.error('Expected data to be an array but received:', data);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return calendarEvents;
};

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

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

