import React, { useState, useEffect } from "react";
import '../../src/globals.css';
import Siderbar from './sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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

const RegisteredEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URI_RAT}/events`); // Ensure this points to your backend

                
                if (!response.ok) {
                    const errorText = await response.text(); // Read the response body for debugging
                    console.error("Error response body:", errorText); // Log the response body
                    throw new Error(`Failed to fetch events. Status: ${response.status}`);
                }

                // Validate content type
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Invalid content type. Expected JSON.");
                }

                const data = await response.json(); // Parse JSON data
                const formattedEvents = data.map(event => ({
                    id: event._id,
                    img: event.poster,
                    topic: event.name,
                    time: stringifyDate(event.start_date, event.end_date)[0],
                    date: stringifyDate(event.start_date, event.end_date)[1],
                    location: event.location,
                    likes: event.likes
                }));

                setEvents(formattedEvents);
            } catch (err) {
                setError(err.message); // Set the error message
            } finally {
                setLoading(false); // Update loading state
            }
        };

        fetchRegisteredEvents(); // Fetch events on component mount
    }, []);

    const likeEvent = async (eventID) => {
        const userID = sessionStorage.getItem('user');
        try {
            const updatedEventID = await axios.put(`${process.env.REACT_APP_API_URI}/api/events/like/${eventID}`, {}, {
                headers: {
                    'x-api-key': process.env.REACT_APP_VENUES_API_KEY
                }
            }).then(response => {
                return response.data._id;
            });

            const likedEvent = {
                entry: updatedEventID
            }

            await axios.put(`${process.env.REACT_APP_USER_URI}/api/users/like/${userID}`, likedEvent, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error}</div>; // Show error state

    return (
        
                <div className="past-events">
                    {events.map(event => (
                        <Link to={`/event/${event.id}`} className="event" key={event.id}>
                            <img src={event.img} alt={`Event ${event.id}`} />
                            <div className="event-topic">{event.topic}</div>
                            <div className='event-span'>
                                <p>{event.date}</p>
                                <p>{event.time}</p>
                                <p>{event.location}</p>
                                <div className='like'>
                                    <FontAwesomeIcon icon={faHeart} onClick={() => likeEvent(event.id)} className='liked' />
                                    <p className='likes'>{event.likes}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            
    );
};

export default RegisteredEvents;
