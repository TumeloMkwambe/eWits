import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Landing from './components/Landing';
import Dashboard from './Pages/Dashboard/Dashboard';
import CreateEvent from './Pages/CreateEvent/createEvent';
import Tickets from './Pages/Tickets/tickets';
import Notifications from './Pages/Notifications/notifications';
import MyEvents from './Pages/MyEvents/myEvents';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/imageupload" element={<ImageUpload />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;