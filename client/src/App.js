import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Landing from './components/Landing';
import Dashboard from './Pages/Dashboard/Dashboard';
import ImageUpload from './components/ImageUpload';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/imageupload" element={<ImageUpload />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;