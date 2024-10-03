import React from 'react';
import Sidebar from '../../components/sidebar.js';
import FavouriteEvents from '../../components/favouriteEvents.js';
import UpcomingEvents from '../../components/upcomingEvents.js';
import FetchedEvents from '../../components/ticketRegForm.js'
import '../../globals.css';

function Home() {
    return (
        <div className="DashboardContainer">
            <Sidebar/>
            <div className="ContentArea">
                      
                    {/* <div className="main-content"> */}
                        <div>
                            <h2 className='title-home'>
                                Favourite Events
                            </h2>
                        </div>
                        <div className="past-events-container">
                        <FetchedEvents />
                        </div>
                        <div>
                            <h2 className='title-home'>Upcoming Events</h2>
                        </div>
                        
                        <div className="past-events-container">
                            < UpcomingEvents />
                        </div>
                    
                {/* </div> */}
            </div>
        </div>
    );
}

export default Home;