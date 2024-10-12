import React from 'react'
import Sidebar from '../../components/sidebar'
import TicketView from '../../components/ticketView'


function tickets () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
            <TicketView/>
        </div>
    </div>
  )
}

export default tickets