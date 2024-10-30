import React from "react";
import CreatedEvents from "../../components/createdEvent";
import Sidebar from '../../components/sidebar';

const MyEvents = () => {
    return (
        <div className="DashboardContainer">
            <Sidebar/>
            <div className="ContentArea">
               
                            <CreatedEvents />
                        </div>
                    </div>  

    );
}

export default MyEvents;