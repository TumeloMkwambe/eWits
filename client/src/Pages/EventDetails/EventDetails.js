import React from "react";
import Sidebar from '../../components/sidebar';
import EventDetailsForm from '../../components/eventDetails';

const EventDetails = () => {
    return (
        <div className="DashboardContainer">
            <Sidebar />
            <EventDetailsForm />
        </div>
    );
}

export default EventDetails;