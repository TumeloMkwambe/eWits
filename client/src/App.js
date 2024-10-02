import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/login';
import Logout from './components/logout';
import Landing from './Pages/Landing/Landing';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import EventDetails from './Pages/EventDetails/EventDetails';
import Tickets from './Pages/Tickets/Tickets';
import { Notifications } from './Pages/Nofications/Notifications';
import MyEvents from './Pages/MyEvents/MyEvents';
import Calendar from './Pages/Calendar/Calendar';
import EventDetailsCard from './Pages/EventDetailsCard/EventDetailsCard';
import Home from './Pages/Home/Home';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./public/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
} else {
  console.warn('Service workers are not supported in this browser.');
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:eventID" element={<EventDetailsCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/myevents/:eventID" element={<EventDetails />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;