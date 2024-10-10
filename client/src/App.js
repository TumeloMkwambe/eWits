import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Logout from './components/logout';
import Landing from './Pages/Landing/Landing';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import EventDetails from './Pages/EventDetails/EventDetails';
import TicketsPage from './components/TicketsPage';
import Notifications from './Pages/Nofications/Notifications';
import MyEvents from './Pages/MyEvents/MyEvents';
import Calendar from './Pages/Calendar/Calendar';
import EventDetailsCard from './Pages/EventDetailsCard/EventDetailsCard';
import Home from './Pages/Home/Home';
import RegisterEvent from './components/RegisterEvent';  // Import RegisterEvent component
import DetailsCard from './components/detailsCard'; // Adjust the import path as necessary


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:eventID" element={<EventDetailsCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/myevents/:eventID" element={<EventDetails />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/events/:eventID" element={<DetailsCard />} />
        <Route path="/events/:eventID/register" element={<RegisterEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
