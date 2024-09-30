import React from "react";
import Sidebar from "../../components/sidebar";
import EventCalendar from "../../components/eventCalendar";

const Calendar = () => {
    return (
        <div className='DashboardContainer'>
        <Sidebar />
        <div className='ContentArea'>
            <EventCalendar />
        </div>
        </div>
    );
}

export default Calendar;