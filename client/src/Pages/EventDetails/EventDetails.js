import React from "react";
import Sidebar from '../../components/sidebar';
import EventDetailsForm from '../../components/eventDetails';

const EventDetails = () => {
    return (
        <div className="DashboardContainer">
            <Sidebar />
            <div className="ContentArea">
            <EventDetailsForm />
            </div>
        </div>
    );
}

export default EventDetails;