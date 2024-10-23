import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DisplayEvents = ({ filteredEvents, route}) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFilteredEvents = async () => {
        const filtered_events = await filteredEvents();
        setEvents(filtered_events);
        setLoading(false);
    }

    useEffect(() => {
        const navigationType = performance.getEntriesByType('navigation')[0]?.type;

        if (navigationType === 'reload') {
            fetchFilteredEvents();
        }
        else{
            fetchFilteredEvents()
        }
    }, []);
    if (loading) {
        return <div>Loading events...</div>;
    }
    else{
        return (
            <div className="past-events">
                {events.map(event => (
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
    }
};

export default DisplayEvents;