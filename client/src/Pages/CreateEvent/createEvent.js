import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../../../src/globals.css'; // Assuming you have a CSS file for styling

function CreateEvent() {
    return (
        <div className="DashboardContainer">
            <Sidebar />
            <div className="ContentArea">
                <div className="TopBar">
                    <span className='page-topbar'>Create Event</span>
                </div>
                <div className="ScrollableContent">
                    
                    
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
