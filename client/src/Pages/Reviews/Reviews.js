import React from 'react'
import '../../globals.css'
import Review from '../../components/Review'
import Sidebar from '../../components/sidebar'

const Reviews = () => {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
            <h2 className='title-home'>Review</h2>
            <Review/>
        </div>
    </div>
  )
}

export default Reviews