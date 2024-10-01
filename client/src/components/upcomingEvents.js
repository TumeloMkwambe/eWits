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

const upcomingEvents = async () => {
    const Events = [];
    await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    })
    .then(response => {
        const data = response.data;
        for (let i = 0; i < Object.keys(data).length; i++) {
            const event = {
                id: data[i]._id,
                img: data[i].poster,
                topic: data[i].name,
                time: stringifyDate(data[i].start_date, data[i].end_date)[0],
                date: stringifyDate(data[i].start_date, data[i].end_date)[1],
                location: data[i].location,
                likes: data[i].likes
            };
    
            const current_date = new Date();
            const start_date = new Date(data[i].start_date);

            if(current_date < start_date){
                Events.push(event);
            }
        }
    })
    .catch(error => console.error('Error fetching events:', error));
    return Events;
};

const UpcomingEvents = () => {
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
            const upcomingEventsData = await upcomingEvents();
            setEvents(upcomingEventsData);
            sessionStorage.setItem('upcoming-events', JSON.stringify(upcomingEventsData));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        const navigationType = performance.getEntriesByType('navigation')[0]?.type;
        
        if (navigationType === 'reload') {
            sessionStorage.removeItem('upcoming-events');
        }

        const storedUpcomingEvents = sessionStorage.getItem('upcoming-events');
        
        if (storedUpcomingEvents) {
            setEvents(JSON.parse(storedUpcomingEvents));
        } else {
            fetchEvents();
        }
    }, []); // Add empty dependency array to prevent infinite loop

    return (
        <div className="past-events">
            {events.map(event => (
                <div key={event.id}>
                    <Link to={`/home/${event.id}`} className="event">
                        <img src={event.img} alt={`Event ${event.id}`} />
                        <div className="event-topic">{event.topic}</div>
                        <div className="event-span">
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

export default UpcomingEvents;
