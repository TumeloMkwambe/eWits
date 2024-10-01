import React, { useEffect, useState } from 'react';
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

const fetchFavouriteEvents = async () => {
    const userID = sessionStorage.getItem('user');
    const Events = [];
    
    // Get liked events of the user
    const likedEvents = await axios.get(`${process.env.REACT_APP_USER_URI}/api/users/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
        }
    }).then(response => response.data.liked_events);

    // Get all events
    await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    })
    .then(response => {
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
            const event = {
                id: data[i]._id,
                img: data[i].poster,
                topic: data[i].name,
                time: stringifyDate(data[i].start_date, data[i].end_date)[0],
                date: stringifyDate(data[i].start_date, data[i].end_date)[1],
                location: data[i].location,
                likes: data[i].likes
            };

            if (likedEvents.includes(event.id)) {
                Events.push(event);
            }
        }
    })
    .catch(error => console.error('Error fetching events:', error));
    return Events;
};

const FavouriteEvents = () => {
    const [events, setEvents] = useState([]);
    const [likedStatus, setLikedStatus] = useState({});

    const likeEvent = async (e, eventID) => {
        e.stopPropagation();
        const userID = sessionStorage.getItem('user');
        try {
            const likedEvent = { entry: eventID };

            const updatedUser = await axios.put(`${process.env.REACT_APP_USER_URI}/api/users/like/${userID}`, likedEvent, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (updatedUser.data.liked_events.includes(eventID)) {
                await axios.put(`${process.env.REACT_APP_API_URI}/api/events/like/${eventID}`, {}, {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });
                setLikedStatus((prev) => ({ ...prev, [eventID]: true }));
            } else {
                await axios.put(`${process.env.REACT_APP_API_URI}/api/events/dislike/${eventID}`, {}, {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });
                setLikedStatus((prev) => ({ ...prev, [eventID]: false }));
            }
        } catch (error) {
            console.log(error);
        }
        fetchEvents();
    };

    const fetchEvents = async () => {
        try {
            const favouriteEventsData = await fetchFavouriteEvents();
            setEvents(favouriteEventsData);
            const likedEventsMap = favouriteEventsData.reduce((acc, event) => {
                acc[event.id] = true; // Mark event as liked
                return acc;
            }, {});
            setLikedStatus(likedEventsMap); // Update liked status state
            sessionStorage.setItem('favourite-events', JSON.stringify(favouriteEventsData));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        const navigationType = performance.getEntriesByType('navigation')[0]?.type;

        if (navigationType === 'reload') {
            sessionStorage.removeItem('favourite-events');
        }

        const storedFavouriteEvents = sessionStorage.getItem('favourite-events');

        if (storedFavouriteEvents) {
            const parsedEvents = JSON.parse(storedFavouriteEvents);
            setEvents(parsedEvents);
            const likedEventsMap = parsedEvents.reduce((acc, event) => {
                acc[event.id] = true; // Mark event as liked
                return acc;
            }, {});
            setLikedStatus(likedEventsMap); // Update liked status state
        } else {
            fetchEvents();
        }
    }, []); // Added empty dependency array

    return (
        <div className="past-events">
            {events.map(event => (
                <div key={event.id}>
                    <Link to={`/home/${event.id}`} className="event">
                        <img src={event.img} alt={`Event ${event.id}`} />
                        <div className="event-topic">{event.topic}</div>
                        <div className='event-span'>
                            <p>{event.date}</p>
                            <p>{event.time}</p>
                            <p>{event.location}</p>
                        </div>
                    </Link>
                    <div onClick={(e) => likeEvent(e, event.id)} className='like'>
                        <FontAwesomeIcon 
                            icon={faHeart} 
                            className='liked' 
                            style={{ color: likedStatus[event.id] ? 'red' : 'grey' }} 
                        />
                        <p className='likes'>{event.likes}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavouriteEvents;
