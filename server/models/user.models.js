const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    liked_events: {
        type: [String],
        required: false
    },
    my_events: {
        type: [String],
        required: false
    }
  });
  const Users = mongoose.model('Users', UsersSchema);

  module.exports = Users;