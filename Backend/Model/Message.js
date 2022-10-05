const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    userId: {
      type: String,
      required: true,
    },
    roomId:{
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },

  },{ timestamps: true });

module.exports = model('Message', messageSchema)