import React from "react";
import Sidebar from "../../components/sidebar";
import EventCalendar from "../../components/eventCalendar";
import '../../globals.css'

const Calendar = () => {
    return (
        <div className='DashboardContainer'>
        <Sidebar />
            <div className='ContentArea'>
                <h2 className="title-home">Calendar</h2>
               
                    <EventCalendar />
                </div>
            </div>
        
    );
}

export default Calendar;