import React from 'react';
import Sidebar from '../../components/sidebar';
import EventForm from '../../components/RegisterEvent';
import RegisterEvent from '../../components/RegisterEvent';

const CreateEvent = () => {
    return (
    <div className='DashboardContainer'>
        < Sidebar />
        <div className='ContentArea'>
            <RegisterEvent />
        </div>
    </div>)
}

export default CreateEvent;