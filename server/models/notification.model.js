const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    notification: {
        type: String,
        required: true
    }
  });
  const Notifications = mongoose.model('Notifications', notificationsSchema);

  module.exports = Notifications;