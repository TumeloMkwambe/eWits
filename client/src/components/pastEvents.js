import React from 'react';
import { Link } from 'react-router-dom';
import witsPic from '../images/wits.png';
import witsPic2 from '../images/event2.jpeg';
import witsPic3 from '../images/event3.jpeg';
import witsPic4 from '../images/event4.jpeg';
import witsPic5 from '../images/event5.jpeg';
import witsPic6 from '../images/event6.jpeg';
import witsPic7 from '../images/event7.jpeg';
import witsPic8 from '../images/event8.jpeg';
import witsPic9 from '../images/event9.jpeg';
import witsPic10 from '../images/event10.jpeg';
import witsPic11 from '../images/event11.jpeg';
import witsPic12 from '../images/event12.jpeg';
import witsPic13 from '../images/event13.jpeg';
import witsPic14 from '../images/event14.jpeg';
import witsPic15 from '../images/event15.jpeg';
import witsPic16 from '../images/event16.jpeg';
import witsPic17 from '../images/event17.jpeg';
import witsPic18 from '../images/event18.jpeg';
import witsPic19 from '../images/event19.jpeg';
import witsPic20 from '../images/event20.jpeg';

const pastEvents = [
    { id: 1, img: witsPic, topic: 'Annual Science Symposium', },
    { id: 2, img: witsPic2, topic: 'Tech Innovators Conference', },
    { id: 3, img: witsPic3, topic: 'Global Health Forum', },
    { id: 4, img: witsPic4, topic: 'Art & Design Expo', },
    { id: 5, img: witsPic5, topic: 'Environmental Sustainability Summit', },
    { id: 6, img: witsPic6, topic: 'Literature & Poetry Festival', },
    { id: 7, img: witsPic7, topic: 'Business Leadership Conference', },
    { id: 8, img: witsPic8, topic: 'Innovative Agriculture Symposium',  },
    { id: 9, img: witsPic9, topic: 'Digital Marketing Workshop', },
    { id: 10, img: witsPic10, topic: 'Cybersecurity Forum', },
    { id: 11, img: witsPic11, topic: 'AI & Machine Learning Conference' },
    { id: 12, img: witsPic12, topic: 'Renewable Energy Expo', },
    { id: 13, img: witsPic13, topic: 'Cultural Heritage Festival' },
    { id: 14, img: witsPic14, topic: 'Sports Science Seminar'},
    { id: 15, img: witsPic15, topic: 'Urban Planning Symposium'},
    { id: 16, img: witsPic16, topic: 'Space Exploration Forum'},
    { id: 17, img: witsPic17, topic: 'Music & Technology Conference'},
    { id: 18, img: witsPic18, topic: 'Financial Markets Seminar'},
    { id: 19, img: witsPic19, topic: 'Human Rights Conference' },
    { id: 20, img: witsPic20, topic: 'Climate Change Workshop'}
];


const PastEvents = () => {
    return (
        <div className="past-events">
            {pastEvents.map(event => (
                <Link to={`/event/${event.id}`} className="event" key={event.id}>
                    <img src={event.img} alt={`Event ${event.id}`} />
                    <div className="event-topic">{event.topic}</div>

                    <div className='event-span'>
                        <div>
                            date
                        </div>
                        <div>
                            something else here
                        </div>
                    </div>
                   
                </Link>
            ))}
        </div>
    );
};

export default PastEvents;
