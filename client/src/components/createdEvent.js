import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from "../Requests/events";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components'; // Import styled-components


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
    
            if (user.my_events.includes(event.id)) {
                Events.push(event);
            }
        }
        setEvents(Events);
    };

    useEffect(() => {
        createdEvents();
    }, []);

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
            <ContentContainer>
                <h2 style={styles.heading}>Your Created Events</h2>
                {events.length > 0 ? (
                    events.map((event) => (
                        <Link 
                            key={event.id} 
                            to={`/eventDetails/${event.id}`}
                            style={styles.eventCard}
                        >
                            <div style={styles.eventLeft}>
                                <img src={event.img} alt={event.topic} style={styles.eventImage} />
                                <h3 style={styles.eventTitle}>{event.topic}</h3>
                                <p style={styles.eventDate}>{event.time} | {event.date}</p>
                                <p style={styles.eventLocation}>{event.location}</p>
                            </div>
                            
                            <div style={styles.eventRight}>
                                <Doughnut data={generateChartData(event)} style={styles.chart} />
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={styles.noEventsText}>No events found</p>
                )}
            </ContentContainer>
    );
};

// Styled components for the container elements
const DashboardContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
    background-size: cover;
    background-position: center;
`;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
    background-color: rgba(249, 249, 249, 0.6); /* Adjust transparency to reduce blur */
    backdrop-filter: blur(2px); /* Lower the blur intensity */
    overflow-y: auto;
`;

// Inline styles
const styles = {
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#003b5b',
    },
    eventCard: {
        display: 'flex',
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)', // Make the border slightly transparent
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Transparent white background
        textAlign: 'center',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.3s ease',
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
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#333',
    },
    eventDate: {
        fontSize: '1rem',
        margin: '5px 0',
        color: '#555',
    },
    eventLocation: {
        fontSize: '0.9rem',
        color: '#777',
        marginBottom: '15px',
    },
    noEventsText: {
        fontSize: '1.2rem',
        color: '#888',
    },
    chart: {
        width: '80%',
        height: 'auto',
    },
};

export default CreatedEvents;