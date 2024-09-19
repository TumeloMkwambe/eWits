import React from 'react'
import Sidebar from '../../components/Sidebar'


function tickets () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
          <div className="TopBar">
              <span className='page-topbar'>Tickets</span>
          </div>
          <div className="ScrollableContent">
                      
                      
          </div>
        </div>
    </div>
  )
}

export default tickets