// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAqOu4rm47AkP0rs0AtDTOwhW4qw13JI8s",
  authDomain: "ewits-storage.firebaseapp.com",
  projectId: "ewits-storage",
  storageBucket: "ewits-storage.appspot.com",
  messagingSenderId: "829716601623",
  appId: "1:829716601623:web:c57122a5c083dbe695b552",
  measurementId: "G-BRT9KSR9K3"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Payload: ", payload);
  alert(payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png' // Path to your notification icon
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
