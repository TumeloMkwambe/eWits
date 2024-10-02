import React from 'react'
import Sidebar from '../../components/sidebar';
import { messaging, getToken, onMessage } from '../../firebaseConfig';
import { updateUser } from '../../Requests/users';

const requestPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_NOTIFICATIONS_API_KEY });
    const user = JSON.parse(sessionStorage.getItem('user'));
    const updatedToken = {
      fcm_token: token
    }
    updateUser(user._id, updatedToken);

  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

function Notifications ()  {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
            Your Notifications here bruv
        </div>
    </div>
  )
}

export { Notifications, requestPermission };
