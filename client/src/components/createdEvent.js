import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchEvents } from "../Requests/events";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

const CreatedEvents = () => {
    const [events, setEvents] = useState([]);

    const createdEvents = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const Events = [];
        await fetchEvents();
        const data = JSON.parse(sessionStorage.getItem('events'));
        for (let i = 0; i < Object.keys(data).length; i++) {
            const event = {
                id: data[i]._id,
                img: data[i].poster,
                topic: data[i].name,
                time: stringifyDate(data[i].start_date, data[i].end_date)[0],
                date: stringifyDate(data[i].start_date, data[i].end_date)[1],
                location: data[i].location,
                likes: data[i].likes,
                capacity: data[i].capacity,
                registrationCount: data[i].registrationCount
            };
    
            if(user.my_events.includes(event.id)){
                Events.push(event);
            }
        }
        setEvents(Events); // Set the events state
    };

    useEffect(() => {
        createdEvents();
    }, []);

    // Chart options and data formatting
    const generateChartData = (event) => {
        return {
            labels: ['Registrations', 'Remaining Capacity'],
            datasets: [
                {
                    label: 'Event Statistics',
                    data: [event.registrationCount, event.capacity - event.registrationCount],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div style={styles.container}>
            {events.length > 0 ? (
                events.map((event) => (
                    <Link 
                        key={event.id} 
                        to={`/eventDetails/${event.id}`} // Use Link to navigate to EventDetails.js
                        style={styles.eventCard} // Style the Link to look like a card
                    >
                        <div style={styles.eventLeft}>
                            {/* Event Image */}
                            <img src={event.img} alt={event.topic} style={styles.eventImage} />
                            <h3 style={styles.eventTitle}>{event.topic}</h3>
                            <p style={styles.eventDate}>{event.time} | {event.date}</p>
                            <p style={styles.eventLocation}>{event.location}</p>
                        </div>
                        
                        <div style={styles.eventRight}>
                            {/* Render the Donut Chart */}
                            <Doughnut data={generateChartData(event)} />
                        </div>
                    </Link>
                ))
            ) : (
                <p style={styles.noEventsText}>No events found</p>
            )}
        </div>
    );
};

// Inline styling
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    eventCard: {
        display: 'flex',
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        width: '80%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        textDecoration: 'none', // Remove underline for the Link
        color: 'inherit', // Inherit the color from parent (title color)
        transition: 'transform 0.3s ease', // Smooth hover transition
    },
    eventCardHover: {
        transform: 'scale(1.05)', // Slight scale effect on hover
    },
    eventLeft: {
        flex: 1,
        padding: '15px',
        textAlign: 'left',
    },
    eventRight: {
        flex: 1,
        padding: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '15px',
    },
    eventTitle: {
        fontSize: '1.8rem',
        marginBottom: '10px',
        color: '#333',
    },
    eventDate: {
        fontSize: '1.1rem',
        margin: '5px 0',
        color: '#555',
    },
    eventLocation: {
        fontSize: '1rem',
        color: '#777',
        marginBottom: '15px',
    },
    chartContainer: {
        marginTop: '15px',
        width: '80%',
        maxWidth: '500px',
        height: '300px',
    },
    noEventsText: {
        fontSize: '1.2rem',
        color: '#888',
    },
};

export default CreatedEvents;