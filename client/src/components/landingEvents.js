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

const landingEvents = async () => {
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

const LandingEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await landingEvents();
                setEvents(eventsData);
                sessionStorage.setItem('landing-events', JSON.stringify(eventsData))
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    
        if (navigationType === 'reload') {
            sessionStorage.removeItem('landing-events');
        }
    
        const storedEvents = sessionStorage.getItem('landing-events');
    
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        } else {
            fetchEvents();
        }
    }, []);
    

    return events;
};

export default LandingEvents;
