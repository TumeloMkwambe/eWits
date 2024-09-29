import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import '../globalStyle.css';
import WitsLogo from '../images/WitsLogo.png';
import FacebookIcon from '../images/FacebookIcon.png';
import InstagramIcon from '../images/InstagramIcon.jpeg';
import xIcon from '../images/xIcon.png';
import LinkedInIcon from '../images/LinkedInIcon.png';
import YouTubeIcon from '../images/YouTubeIcon.png';
import WSS from '../images/WSS.png';
import GreatHall from '../images/GreatHall.png';
import Tour from '../images/Tour.png';
import Parade from '../images/Parade.jpeg';
import CCDU from '../images/CCDU.jpg';
import WCCO from '../images/WCCO.jpeg';
import SRC from '../images/SRC.jpeg';
import ghosh from '../images/ghosh.jpeg';
import Logo from '../images/eWits.png';
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

const pastEvents = async () => {
  const userID = sessionStorage.getItem('user');
  const Events = [];
  const likedEvents = await axios.get(`${process.env.REACT_APP_USER_URI}/api/users/${userID}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( response => {
      return response.data.liked_events;
    });

  await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
      headers: {
          'x-api-key': process.env.REACT_APP_VENUES_API_KEY
      }
  })
  .then(response => {
      const data = response.data;
      console.log(data);
      for (let i = 0; i < Object.keys(data).length; i++) {
          const event = {
              id: data[i]._id,
              img: data[i].poster,
              topic: data[i].name,
              location: data[i].location,
              time: stringifyDate(data[i].start_date, data[i].end_date)[0],
              date: stringifyDate(data[i].start_date, data[i].end_date)[1],
          };
  
          if (likedEvents.includes(event.id)) {
              Events.unshift(event);
          } else {
              Events.push(event);
          }
      }
  })
  .catch(error => console.error('Error fetching events:', error));

  return Events;
};

const LandingPage = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Check if events are stored in localStorage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
    } else {
        const fetchEvents = async () => {
            const eventsData = await pastEvents();
            setEvents(eventsData);
            // Store fetched events in localStorage
            localStorage.setItem('events', JSON.stringify(eventsData));
        };

        fetchEvents();
    }
  }, []);

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src={Logo} alt="App Logo" className="logo"/>
        </div>
        <nav className="nav-bar">
            <a>About</a>
            <a>Services</a>
            <a>Contacts</a>
            <a>Blog</a>
        </nav>
        <a> <Login /> </a>
      </header>

      <main>
      <h2>eWits Takes The Edge Off!</h2>
          <section className="welcome-section">
            <div>
              <h3>Brand Manifesto</h3>
            <article>At eWits, we believe that campus life should be vibrant, engaging, and accessible to all. We exist to revolutionize the way events are experienced by creating a seamless connection between students and their community.</article>
            </div>
            <div>
            <h3>Our Purpose</h3>
            <article>We empower students to take the edge off the chaos of campus events by providing a centralized platform where creativity and organization meet. From event creation to management, registration, ticketing, and verification, we simplify the entire process.
            </article>
            </div>
            <div>
            <h3>Our Vision</h3>
            <article>
              We envision a world where every student feels included, informed, and inspired to participate in campus life. eWits is not just an app; it's a community hub that fosters connection and engagement, turning every event into a memorable experience.
            </article>
            </div>
          </section>

        <section className="carousel-container">
          <div className="carousel">
          {events.map(event => (
                  <div className='carousel-item'>
                      <img src={event.img} alt={`Event ${event.id}`} className="carousel-image"/>
                      <div className='carousel-info'>
                        <p className='carousel-name'>{event.topic}</p>
                        <p className='carousel-location'>{event.location}</p>
                        <p className='carousel-date'>{event.date}</p>
                      </div>
                    </div>
              ))} 
          </div>
        </section>

        <section className="tour-section">
          <a href="https://www.wits.ac.za/campus-life/wits-virtual-tour/" target="_blank" rel="noopener noreferrer" className="clickable-image">
            <img src={GreatHall} alt="Description of image" className="tour-image" />
            <span className="hover-tour">Click for tour</span>
          </a>
        </section>

        <section id="about-section" className="about-section">
          <h3>About eWits</h3>
          <img src={WSS} alt="WSS" className="about-image" />
          <p>Welcome to eWits, your go-to platform for discovering and organizing exciting events on campus!...</p>
        </section>
      </main>

      <footer>
        <div className="footer-section-contact">
          <h4>Contact Us</h4>
          <p>General enquiries<br/>Tel: +27 11 717 1000<br/>Admission enquiries<br/>Tel: +27 11 717 1888</p>
        </div>
        <div className="footer-section">
          <h4>Find Us</h4>
          <p>1 Jan Smuts Avenue,<br/>Braamfontein 2000,<br/>Johannesburg,<br/>South Africa</p>
        </div>
        <div className="footer-section-quick">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="https://www.wits.ac.za/students/wits-bus-service/">Wits Transport</a></li>
            <li><a href="https://www.wits.ac.za/campus-life/security-on-campus/">Campus Control</a></li>
            <li><a href="https://www.wits.ac.za/campus-life/eateries/">Wits Eateries</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h4>Connect With Us</h4>
          <a href="https://www.facebook.com/witsuniversity" target="_blank" rel="noopener noreferrer"><img src={FacebookIcon} alt="Facebook" /></a>
          <a href="https://x.com/witsuniversity" target="_blank" rel="noopener noreferrer"><img src={xIcon} alt="X" /></a>
          <a href="https://www.instagram.com/wits__university/" target="_blank" rel="noopener noreferrer"><img src={InstagramIcon} alt="Instagram" /></a>
          <a href="https://www.linkedin.com/school/university-of-the-witwatersrand/posts/?feedView=all" target="_blank" rel="noopener noreferrer"><img src={LinkedInIcon} alt="LinkedIn" /></a>
          <a href="https://www.youtube.com/user/WitsWebmaster" target="_blank" rel="noopener noreferrer"><img src={YouTubeIcon} alt="YouTube" /></a>
        </div>
        <div className="copyright">
          <p>&copy; 2024 eWits. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;