import axios from 'axios';

const userLikesEvent = async (eventID) => {
    const user = sessionStorage.getItem('user');
    const likedEvent = { entry: eventID };
    const updatedUser = await axios.put(`${process.env.REACT_APP_USER_URI}/api/users/like/${user._id}`, likedEvent, {
        headers: {
          'Content-Type': 'application/json',
        }
    });
    sessionStorage.getItem('user', updatedUser);
}

const updateUser = async (userID, updateToken) => {
  const user = await axios.put(`${process.env.REACT_APP_USER_URI}/api/users/${userID}`, updateToken, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  sessionStorage.getItem('user', user);
}

export { updateUser, userLikesEvent };