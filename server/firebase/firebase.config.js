const admin = require('firebase-admin');
const serviceAccount = require('./ewits-storage-firebase-adminsdk-i9xm5-fe6da398d0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

module.exports = { bucket };