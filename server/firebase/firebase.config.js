const admin = require('firebase-admin');
const serviceAccount = require('./ewits-storage-firebase-adminsdk-i9xm5-fe6da398d0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://ewits-storage.appspot.com',
});

const bucket = admin.storage().bucket();

module.exports = { bucket };