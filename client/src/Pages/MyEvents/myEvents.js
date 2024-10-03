import React from "react";
import CreatedEvents from "../../components/createdEvents";
import Sidebar from '../../components/sidebar';

const MyEvents = () => {
    return (
        <div className="DashboardContainer">
            <Sidebar/>
            <div className="ContentArea">
                <div className="home">       
                    
                        <div>
                            <h2 className='title-home'>
                                Created Events
                            </h2>
                        </div>
                        <div className="past-events-container">
                            
                            <CreatedEvents />
                        </div>
                     
                </div>
            </div>
        </div>
    );
}

export default MyEvents;