import React from 'react'
import Sidebar from '../../components/Sidebar'


function myEvents () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
          <div className="TopBar">
              <span className='page-topbar'>My Events</span>
          </div>
          <div className="ScrollableContent">
                    
                    
          </div>
        </div>

    </div>
  )
}

export default myEvents

