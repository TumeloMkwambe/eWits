import React from 'react';
import Sidebar from '../../components/sidebar';
import Notifications from '../../components/Notifications';

const CreateEvent = () => {
    return (
    <div className='DashboardContainer'>
        < Sidebar />
        <div className='ContentArea'>
            <Notifications />
        </div>
    </div>)
}

export default CreateEvent;