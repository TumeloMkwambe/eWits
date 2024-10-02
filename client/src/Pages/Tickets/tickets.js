import React from 'react'
import Sidebar from '../../components/sidebar'
import FetchedEvents from '../../components/ticketRegForm'
import RegisteredEvents from '../../components/RegisteredEvents'


function tickets () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
          <div className='main-content'>
            <div>
              <h2 className='title-home'>
                 Tickets
              </h2>
              </div>
                <div className="past-events-container">          
                    <FetchedEvents />
                </div>
                <h2 className='upcoming-events'>Upcoming Events</h2>
                  <div className="past-events-container">
                      < RegisteredEvents />
                  </div>
          </div>
        </div>
    </div>
  )
}

export default tickets