import React from 'react';
import DetailsCard from '../../components/detailsCard';
import Sidebar from '../../components/sidebar';

const EventDetailsCard = () => {

  return (
    <div className='DashboardContainer'>
        <Sidebar />
        <div className='ContentArea'>
        <div>
        <DetailsCard />
        </div>
        </div>
    </div>
  );
};

export default EventDetailsCard;
