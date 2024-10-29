import React from 'react'
import Sidebar from '../../components/sidebar'
import TicketsPage from '../../components/TicketsPage'


function tickets () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
            Your Tickets Right here bruv
        </div>
    </div>
  )
}

export default TicketsPage