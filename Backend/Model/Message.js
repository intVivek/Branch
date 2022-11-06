const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    user: {
      type: String,
      ref: "User",
    },
    room: {
        type: String,
        ref: "Room",
    },
    message: {
        type: String,
        required: false,
    },

  },{ timestamps: true });

module.exports = model('Message', messageSchema)