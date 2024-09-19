import React from 'react'
import Sidebar from '../../components/Sidebar'

function profile () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
          <div className="TopBar">
            <span className='page-topbar'>Profile</span>
          </div>
          <div className="ScrollableContent">
                    
                    
          </div>
        </div>
    </div>
  )
}

export default profile