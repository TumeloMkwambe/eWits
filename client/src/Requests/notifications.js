import axios from "axios";

const fetchNotifications = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    axios.get(`${process.env.REACT_APP_NOTIFICATIONS_API}/api/notifications/${user._id}`, {
        headers: {
            "Content": "application/json"
        }
    }).then( response => {
        sessionStorage.setItem('notifications', JSON.stringify(response.data));
    });
}

const createdEventNotification = async (body) => {
    await axios.post(`${process.env.REACT_APP_NOTIFICATIONS_API}/api/notifications/send`, body, {
        headers: {
            "Content": "application/json"
        }
    }).then( response => {
        console.log(response);
        sessionStorage.setItem('notifications', JSON.stringify(response.data));
    });

}

export { fetchNotifications, createdEventNotification };