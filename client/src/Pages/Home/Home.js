import React, { useState } from 'react';
import Sidebar from '../../components/sidebar.js';
import FavouriteEvents from '../../components/favouriteEvents.js';
import UpcomingEvents from '../../components/upcomingEvents.js';
import FilteredEvents from '../../components/filteredEvents.js';
import EventList from '../../components/search.js';
import SearchBar from '../../components/searchBar.js';
import '../../globals.css';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const Types = [
        'Sports', 'Religion', 'Education', 'Music', 'Arts and Culture', 'Business and Networking', 
        'Food and Drink', 'Community and Social', 'Health and Wellness', 'Charity and Fundraising', 
        'Technology', 'Family'
    ];

    return (
        <div className="DashboardContainer">
            <Sidebar/>
            <div className="ContentArea">
                <div className="home"> 
                    <SearchBar setSearchQuery={setSearchQuery} />    
                    <div className="main-content">

                        {Types.map(type => (
                            <div key={type}>
                                <h2 className='upcoming-events'>{type}</h2>
                                <div className="past-events-container">
                                    <FilteredEvents type={type} searchQuery={searchQuery} />
                                </div>
                            </div>
                        ))}
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Home;
