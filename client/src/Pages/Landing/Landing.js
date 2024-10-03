import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../components/login';
import '../../globalStyle.css';
import FacebookIcon from '../../images/FacebookIcon.png';
import InstagramIcon from '../../images/InstagramIcon.jpeg';
import xIcon from '../../images/xIcon.png';
import LinkedInIcon from '../../images/LinkedInIcon.png';
import YouTubeIcon from '../../images/YouTubeIcon.png';
import WSS from '../../images/WSS.png';
import GreatHall from '../../images/GreatHall.png';
import Logo from '../../images/eWits.png';
import LandingEvents from '../../components/landingEvents';

const LandingPage = () => {
  const events = LandingEvents();

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src={Logo} alt="App Logo" className="logo"/>
        </div>
        <nav className="nav-bar">
        <a>
            About
            <span className="hover-info">
            At eWits, we’re revolutionizing the event experience. 
            Our platform empowers users to effortlessly create, manage, and attend events, all in one place. 
            From discovering the latest campus activities to purchasing tickets, we make event management seamless. 
            Whether you're hosting or participating, eWits ensures that every event runs smoothly, fostering community engagement and making every moment memorable. 
            Join us and simplify your event journey!
            </span>
          </a>
          <a>
            Services
            <span className="hover-info">
            Unlock a world of endless possibilities with eWits. 
            Whether it’s a campus concert, a workshop, or a networking event, 
            we’ve got you covered. Our services provide you with the tools to create and manage unforgettable experiences. 
            From event registration to seamless ticket purchases, we make it all happen—effortlessly.
            </span>
          </a>
          <a>
            Contacts
            <span className="hover-info">
            Got questions or need assistance? We're here for you! 
            Our team is dedicated to ensuring that your event experience is smooth and enjoyable. 
            Whether you're organizing or attending, we’re just a call or message away. 
            Let’s connect and make your event unforgettable!
            </span>
          </a>
          <a>
            Blog
            <span className="hover-info">
            Stay in the loop with the latest event trends, tips, and insider stories! 
            Our blog keeps you informed and inspired, whether you’re looking to host an event or find new ways to engage with your community. 
            Dive into a world of creativity and innovation with eWits.
            </span>
          </a>
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