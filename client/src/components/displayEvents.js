import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchEvents, likeEvent, dislikeEvent, userLikesEvent } from '../Requests/events';

const like = async (e, eventID) => {
    e.stopPropagation();
    try {
        await userLikesEvent(); // Assuming this function returns a promise
        const updatedUser = JSON.parse(sessionStorage.getItem('user')); // Parse the user object

        if (updatedUser.data.liked_events.includes(eventID)) {
            await likeEvent(eventID); // Add await here if it's an async function
        } else {
            await dislikeEvent(eventID); // Add await here if it's an async function
        }
    } catch (error) {
        console.log(error);
    }
    await fetchEvents(); // Add await here if it's an async function
};

const DisplayEvents = ({ filteredEvents, route }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFilteredEvents = async () => {
        const filtered_events = await filteredEvents();
        setEvents(filtered_events);
        setLoading(false);
    };

    useEffect(() => {
        // Only run this effect if not in test environment
        if (process.env.NODE_ENV !== 'test') {
            const navigationType = performance.getEntriesByType('navigation')[0]?.type;

            if (navigationType === 'reload') {
                fetchFilteredEvents();
            } else {
                fetchFilteredEvents();
            }
        } else {
            fetchFilteredEvents(); // Fetch events directly in the test environment
        }
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    } else {
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
                        <div onClick={(e) => like(e, event.id)} className='like'>
                            <FontAwesomeIcon 
                                icon={faHeart} 
                                className='liked'
                            />
                            <p className='likes'>{event.likes}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};

export default DisplayEvents;