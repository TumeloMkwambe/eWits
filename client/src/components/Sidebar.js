import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f7f7f7;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  color: #333;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem><Link to="/">Home</Link></SidebarItem>
      <SidebarItem><Link to="/create-event">Create Event</Link></SidebarItem>
      <SidebarItem><Link to="/my-events">My Events</Link></SidebarItem>
      <SidebarItem><Link to="/calendar">Calendar</Link></SidebarItem>
      <SidebarItem><Link to="/tickets">Tickets</Link></SidebarItem>
      <SidebarItem><Link to="/notifications">Notifications</Link></SidebarItem>
      <SidebarItem><Link to="/profile">My Profile</Link></SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
