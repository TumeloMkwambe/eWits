const admin = require('firebase-admin');
const serviceAccount = require('./ewits-storage-firebase-adminsdk-i9xm5-1a2d369b9c.json');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

module.exports = { bucket };