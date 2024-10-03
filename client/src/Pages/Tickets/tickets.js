import React, {useState} from 'react'
import Sidebar from '../../components/sidebar'
import RegistrationForm from '../../components/RegistrationForm'
import RegisteredEvents from '../../components/RegisteredEvents'
import '../../../src/tickets.css'

function Tickets () {

  const [userId, setUserId] = useState("user123"); // Replace with actual user ID
  const [showEvents, setShowEvents] = useState(false); // Control when to show registered events

  const handleShowEvents = () => {
    setShowEvents(true); // Set to true to display registered events
  };
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
                
                <RegistrationForm userId={userId} />

                <h2 className='past-events'>Upcoming Events</h2>
                  <div className="past-events-container">
                  {showEvents && <RegisteredEvents userId={userId} />}
                  </div>
          </div>
        </div>
    </div>
  )
}

export default Tickets