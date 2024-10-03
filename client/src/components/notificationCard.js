import React, { useState, useEffect } from "react";
import { fetchNotifications } from "../Requests/notifications";
import '../globalStyle.css';

const NotificationCard = () => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    await fetchNotifications();
    const storedNotifications = sessionStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications)); // Parse and set notifications
    }
  };

  useEffect(() => {
    getNotifications();
  }, []); // Runs once on component mount

  return (
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div className="notification-item" key={notification._id}>
            <p>{notification.notification}</p>
          </div>
        ))
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default NotificationCard;
