import Sidebar from '../../components/sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchEventMessages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/events`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        });

        // Collect all messages from each event
        const messages = response.data.flatMap(event => event.messages || []);
        
        // Store messages in state
        setNotifications(messages);
      } catch (error) {
        console.error('Error fetching event messages:', error);
      }
    };

    fetchEventMessages();
  }, []);

  return (
    <div className="DashboardContainer">
      <div className="ContentArea">
        <h2>Your Notifications</h2>
        {notifications.length ? (
          <div className="notificationList">
            {notifications.map((msg) => (
              <div key={msg._id} className="notification">
                <p className="notificationContent">{msg.content}</p>
                <small className="notificationDate">{new Date(msg.date).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        ) : (
          <p>No notifications available</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
