import React from 'react';
import Sidebar from '../../components/sidebar';
import EventForm from '../../components/eventForm';

const CreateEvent = () => {
    return (
    <div className='DashboardContainer'>
        < Sidebar />
        <div className='ContentArea'>
            <EventForm />
        </div>
    </div>)
}

export default CreateEvent;