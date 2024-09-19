import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Landing from './components/Landing';
// import Dashboard from './Pages/Dashboard/Dashboard';
import CreateEvent from './Pages/CreateEvent/createEvent';
import Tickets from './Pages/Tickets/tickets';
import Notifications from './Pages/Notifications/notifications';
import MyEvents from './Pages/MyEvents/myEvents';
import Profile from './Pages/Profile/profile';
import ImageUpload from './components/ImageUpload';
import Calendar from './components/EventCalendar';
import Home from './Pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/imageupload" element={<ImageUpload />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;