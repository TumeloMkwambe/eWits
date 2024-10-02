import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar.js';
import FavouriteEvents from '../../components/favouriteEvents.js';
import UpcomingEvents from '../../components/upcomingEvents.js';
import EventList from '../../components/search.js';
import '../../globals.css';


const Home = () => {

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
                            
                            <FavouriteEvents />
                        </div>
                        <h2 className='upcoming-events'>Upcoming Events</h2>
                        <div className="past-events-container">
                            < UpcomingEvents />
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Home;