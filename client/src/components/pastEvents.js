import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const pastEvents = async () => {
    const Events = [];
    await fetch(`${process.env.REACT_APP_API_URI}/api/emapi/events`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < Object.keys(data).length; i++) {
                const event = {
                    id: data[i]._id,
                    img: data[i].poster,
                    topic: data[i].name,
                    date: data[i].start_date,
                    location: data[i].location
                };
                Events.push(event);
            }
        })
        .catch(error => console.error('Error fetching events:', error));
    return Events;
};


const PastEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsData = await pastEvents();
            setEvents(eventsData);
        };

        fetchEvents();
    }, []);

    return (
        <div className="past-events">
            {events.map(event => (
                <Link to={`/event/${event.id}`} className="event" key={event.id}>
                    <img src={event.img} alt={`Event ${event.id}`} />
                    <div className="event-topic">{event.topic}</div>

                    <div className='event-span'>
                        <div>
                            {Date(event.date)}
                        </div>
                        <div>
                            {event.location}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PastEvents;
