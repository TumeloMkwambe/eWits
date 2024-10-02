import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom';
import Logo from '../../src/images/logo1.svg'
import { FaHome, FaCalendarAlt, FaTicketAlt, FaBell, FaImages } from 'react-icons/fa';
import { requestPermission } from '../Pages/Nofications/Notifications';


const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    navigate('/logout'); 
  };

  return (
    <div className="sidebar">

  <div className="profile-section">
    <img src={Logo} alt="Profile" className="profile-image" />
    <h3 className="profile-name">eWits</h3>
  </div>
  <nav>
    <NavLink to="/home" className="nav-link">
      <FaHome />
      <span>Home</span>
    </NavLink>
    <NavLink to="/createevent" className="nav-link">
      <FaCalendarAlt />
      <span>Create Event</span>
    </NavLink>
    <NavLink to="/myevents" className="nav-link">
      <FaCalendarAlt />
      <span>My Events</span>
    </NavLink>
    <NavLink to="/calendar" className="nav-link">
      <FaCalendarAlt />
      <span>Calendar</span>
    </NavLink>
    <NavLink to="/tickets" className="nav-link">
      <FaTicketAlt />
      <span>Tickets</span>
    </NavLink>
    <NavLink to="/notifications" onClick={requestPermission} className="nav-link">
      <FaBell/>
      <span>Notifications</span>
    </NavLink>
  </nav>
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
  </div>
  );
};

export default Sidebar;