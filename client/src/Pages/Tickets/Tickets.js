import React from 'react'
import Sidebar from '../../components/sidebar'
import TicketView from '../../components/ticketView'


function tickets () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
        <div>
                <h2 className='title-home'>
                  Tickets
                </h2>
              </div>
                
                <TicketView  />
        </div>
    </div>
  )
}

export default tickets