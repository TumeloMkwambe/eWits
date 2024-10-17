import React from 'react'
import Sidebar from '../../components/sidebar'
import Review from '../../components/Review'

function notifications ()  {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
            <h3>Notifications</h3>
        </div>
    </div>
  )
}

export default notifications