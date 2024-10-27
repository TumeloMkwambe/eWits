import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Logout from './components/logout';
import Landing from './Pages/Landing/Landing';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import EventDetails from './Pages/EventDetails/EventDetails';  // Adjusted import for EventDetails
import TicketsPage from './components/TicketsPage';
import Notifications from './Pages/Nofications/Notifications';
import MyEvents from './Pages/MyEvents/MyEvents';
import Calendar from './Pages/Calendar/Calendar';
import EventDetailsCard from './Pages/EventDetailsCard/EventDetailsCard';
import Home from './Pages/Home/Home';
import RegisterEvent from './Pages/RegisterEvent/RegisterEvent';  // Import RegisterEvent component
import DetailsCard from './components/detailsCard'; // Adjust the import path as necessary
import CreatedEvents from './components/createdEvent'; // Import the CreatedEvents component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing and Authentication Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Home Page and Event Details */}
        <Route path="/home" element={<Home />} />
        <Route path="/home/:eventID" element={<EventDetailsCard />} />

        {/* Event Creation and Tickets Pages */}
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/tickets" element={<TicketsPage />} />

        {/* Notifications and Calendar */}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/calendar" element={<Calendar />} />

        {/* Event Listing and My Events */}
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/myevents/:eventID" element={<EventDetails />} />  {/* This will render EventDetails for specific event */}

        {/* Created Events Page */}
        <Route path="/createdevents" element={<CreatedEvents />} />  {/* The page that lists all created events */}
        


        {/* Event Registration and Details */}
        <Route path="/events/:eventID" element={<DetailsCard />} />
        <Route path="/events/:eventID/register" element={<RegisterEvent />} />

        {/* Correcting the missing event details route */}
        <Route path="/eventDetails/:eventID" element={<EventDetails />} /> {/* New route for event details */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
