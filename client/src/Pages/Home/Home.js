// import React from 'react';
// import Sidebar from '../../components/sidebar.js';
// import FavouriteEvents from '../../components/favouriteEvents.js';
// import UpcomingEvents from '../../components/upcomingEvents.js';
// import FilteredEvents from '../../components/filteredEvents.js';
// import EventList from '../../components/search.js';
// import '../../globals.css';


// const Home = () => {

//     const Types = [
//         'Sports',
//         'Religion',
//         'Education',
//         'Music',
//         'Arts and Culture',
//         'Business and Networking',
//         'Food and Drink',
//         'Community and Social',
//         'Health and Wellness',
//         'Charity and Fundraising',
//         'Technology',
//         'Family',
//       ];

//     return (
//         <div className="DashboardContainer">
//             <Sidebar/>
//             <div className="ContentArea">
            
//                         <div>
//                             <h2 className='title-home'>
//                                 Favourite Events
//                             </h2>
//                         </div>
//                         <div className="past-events-container">
                            
//                             <FavouriteEvents />
//                         </div>

//                         {Types.map((type, index) => (
//                             <React.Fragment key={index}>
//                                 <h2 className='upcoming-events'>{type}</h2>
//                                   <div className="past-events-container">

                                    
//                                         <div className="past-events-container">
//                                         <FilteredEvents type={type} />
//                                         </div>
//                                   </div>
                                
//                             </React.Fragment>
//                         ))}

//                     </div>  
//                 </div>
//     );
// }

// export default Home;

import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar.js';
import FavouriteEvents from '../../components/favouriteEvents.js';
import UpcomingEvents from '../../components/upcomingEvents.js';
import FilteredEvents from '../../components/filteredEvents.js';
import EventList from '../../components/search.js';
import '../../globals.css';

const Home = () => {
    const Types = [
        'Sports',
        'Religion',
        'Education',
        'Music',
        'Arts and Culture',
        'Business and Networking',
        'Food and Drink',
        'Community and Social',
        'Health and Wellness',
        'Charity and Fundraising',
        'Technology',
        'Family',
    ];

    useEffect(() => {
        const container = document.querySelectorAll('.past-events-container');
        let isDragging = false;
        let startX;
        let scrollLeft;
        let animationFrameId;

        container.forEach((el) => {
            el.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.pageX - el.offsetLeft;
                scrollLeft = el.scrollLeft;
            });

            el.addEventListener('mouseleave', () => {
                isDragging = false;
            });

            el.addEventListener('mouseup', () => {
                isDragging = false;
                // Start deceleration after mouse up
                decelerateScroll(el);
            });

            el.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - startX) * 2; // Multiplier for scroll speed
                el.scrollLeft = scrollLeft - walk;
            });
        });

        // Function to handle deceleration
        function decelerateScroll(el) {
            const initialScrollLeft = el.scrollLeft;
            const duration = 500; // Deceleration duration in ms
            const easing = (t) => 1 - Math.pow(1 - t, 3); // Ease out function

            const startTime = performance.now();

            function animateScroll(currentTime) {
                const elapsedTime = currentTime - startTime;
                const t = Math.min(elapsedTime / duration, 1);
                const easingValue = easing(t);
                
                el.scrollLeft = initialScrollLeft - (initialScrollLeft - el.scrollLeft) * easingValue;

                if (t < 1) {
                    animationFrameId = requestAnimationFrame(animateScroll);
                }
            }

            // Start the animation
            animationFrameId = requestAnimationFrame(animateScroll);
        }

        // Clean up on component unmount
        return () => {
            container.forEach((el) => {
                el.removeEventListener('mousedown', () => {});
                el.removeEventListener('mouseleave', () => {});
                el.removeEventListener('mouseup', () => {});
                el.removeEventListener('mousemove', () => {});
            });
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="DashboardContainer">
            <Sidebar/>
            <div className="ContentArea">
                <div>
                    <h2 className='title-home'>Favourite Events</h2>
                </div>
                <div className="past-events-container">
                    <FavouriteEvents />
                </div>

                {Types.map((type, index) => (
                    <React.Fragment key={index}>
                        <h2 className='upcoming-events'>{type}</h2>
                        <div className="past-events-container">
                            <div className="past-events-container">
                            
                                <FilteredEvents type={type} />
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>  
        </div>
    );
};

export default Home;
