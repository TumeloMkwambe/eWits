import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function stringifyDate(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  
  const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
  ];

  const start_hour = String(date1.getHours()).padStart(2, '0');
  const start_minute = String(date1.getMinutes()).padStart(2, '0');
  const end_hour = String(date2.getHours()).padStart(2, '0');
  const end_minute = String(date2.getMinutes()).padStart(2, '0');

  const time = `${start_hour}:${start_minute} - ${end_hour}:${end_minute}`;
  const date = `${date1.getDate()} ${monthNames[date1.getMonth()]} ${date1.getFullYear()}`;
  
  return [time, date];
}

const createdEvents = async () => {
  const userID = sessionStorage.getItem('user');
  const Events = [];
  const myEvents = await axios.get(`${process.env.REACT_APP_USER_URI}/api/users/${userID}`, {
    headers: {
        'Content-Type': 'application/json',
      }
    }).then( response => {
      return response.data.my_events;
    });
    await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
      headers: {
        'x-api-key': process.env.REACT_APP_VENUES_API_KEY,
      },
      })
      .then(response => response.data)
      .then(data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          const event = {
              id: data[i]._id,
              img: data[i].poster,
              topic: data[i].name,
              time: stringifyDate(data[i].start_date, data[i].end_date)[0],
              date: stringifyDate(data[i].start_date, data[i].end_date)[1],
              location: data[i].location
          };
          if(myEvents.includes(event.id)){
              Events.push(event);
          }
        }
      })
      .catch(error => console.error('Error fetching events:', error));
  return Events;
};

const CreatedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
      const fetchEvents = async () => {
          const eventsData = await createdEvents();
          setEvents(eventsData);
      };

      fetchEvents();
  }, []);

  return (
      <div className="past-events">
          {events.map(event => (
              <Link to={`/event/${event.id}`} className="event" key={event.id}>
                  <img src={event.img} alt={`Event ${event.id}`}/>
                  <div className="event-topic">{event.topic}</div>

                  <div className='event-span'>
                      <p>
                          {event.date}
                      </p>
                      <p>
                          {event.time}
                      </p>
                      <p>
                          {event.location}
                      </p>
                  </div>
              </Link>
          ))}
      </div>
  );
};

export default CreatedEvents