import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Logout from './components/logout';
import Landing from './Pages/Landing/Landing';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import Tickets from './Pages/Tickets/Tickets';
import Notifications from './Pages/Nofications/Notifications';
import MyEvents from './Pages/MyEvents/myEvents';
import Calendar from './Pages/Calendar/Calendar';
import Home from './Pages/Home/Home';
import EventDetails from './components/eventDetails'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/event-details" element={<EventDetails />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
