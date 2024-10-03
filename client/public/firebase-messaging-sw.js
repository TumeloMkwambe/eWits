if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./public/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
} else {
  console.warn('Service workers are not supported in this browser.');
}