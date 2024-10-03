import React from 'react'
import Sidebar from '../../components/sidebar';
import { messaging, getToken, onMessage } from '../../firebaseConfig';
import { updateUser } from '../../Requests/users';
import NotificationCard from '../../components/notificationCard';
import { fetchNotifications } from '../../Requests/notifications';
import '../../globalStyle.css';

const requestPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_NOTIFICATIONS_API_KEY });
    const user = JSON.parse(sessionStorage.getItem('user'));
    const updatedToken = {
      fcm_token: token
    }
    updateUser(user._id, updatedToken);
    console.log("Token: ", token);
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

function Notifications ()  {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
          <h2 className='notification-header'>Notifications</h2>
            <div className='notification-container'>
              <NotificationCard />
            </div>
        </div>
    </div>
  )
}

export { Notifications, requestPermission };
