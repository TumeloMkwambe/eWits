import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Logout from './components/logout';
import Payment from './components/payments';
import Completion from './components/Completion';
import Landing from './Pages/Landing/Landing';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import Tickets from './Pages/Tickets/Tickets';
import Notifications from './Pages/Nofications/Notifications';
import MyEvents from './Pages/MyEvents/myEvents';
import Calendar from './Pages/Calendar/Calendar';
import Home from './Pages/Home/Home';
import EventDetails from './components/eventsFetchedDetails';
import EventDetailss from './components/eventDetailss';
import CompletePage from './components/CompletePage';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Stripe public key initialization
const stripePromise = loadStripe("pk_test_51Q5K2cIGdJX290o6AGtNDjFKDaLF60nyLuGlhI3NMCdXsHYPTKAMd3CodrnWBf944hzuC0A5nNPjqPaRSaOcnYLv00nCmlil7h");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        <Route path="/dummy" element={<EventDetailss />} />
        
        {/* Payment Routes */}
        <Route path="/payments/*" element={<Payment />} />
        
        {/* Wrap Completion page with Elements provider */}
        <Route 
          path="/completion" 
          element={
            <Elements stripe={stripePromise}>
              <CompletePage />
            </Elements>
          } 
        />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
