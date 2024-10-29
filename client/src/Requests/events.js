import axios from 'axios';

const fetchEvents = async () => {
    const events = await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    })
    .then(response => {
        return response.data
    })
    .catch(error => console.error('Error fetching events:', error));
    sessionStorage.setItem('events', JSON.stringify(events));
};

const likeEvent = async (eventID) => {
    const updatedEvent = await axios.put(`${process.env.REACT_APP_API_URI}/api/events/like/${eventID}`, {}, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    });
    fetchEvents();
}

const dislikeEvent = async (eventID) => {
    const updatedEvent = await axios.put(`${process.env.REACT_APP_API_URI}/api/events/dislike/${eventID}`, {}, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    });
    fetchEvents();
}

export { fetchEvents, likeEvent, dislikeEvent };