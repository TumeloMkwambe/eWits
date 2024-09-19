import React from 'react'
import Sidebar from '../../components/Sidebar'

function notifications ()  {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
          <div className="TopBar">
            <span className='page-topbar'>Notifications</span>
          </div>
          <div className="ScrollableContent">
                      
                      
          </div>
        </div>
    </div>
  )
}

export default notifications