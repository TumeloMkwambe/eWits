import React from 'react';
import Sidebar from '../../components/Sidebar';
import PastEvents from '../../components/pastEvents';
import UpcomingEvents from '../../components/upcoming-events';
import '../../globals.css';

function Home() {
    return (
        <div className="DashboardContainer">
            <Sidebar/>
            <div className="ContentArea">
                <div className="home">       
                    <div className="main-content">
                        <div>
                            <h2 className='title-home'>
                                Favourite Events
                            </h2>
                        </div>
                        <div className="past-events-container">
                            
                            <PastEvents />
                        </div>
                        <div className="upcoming-events">
                            <h2 className='upcoming-events'>Upcoming Events</h2>

                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Home;