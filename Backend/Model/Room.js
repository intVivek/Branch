const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
    user: {
      type: String,
      required: true,
    },
    roomId:{
        type: String,
        required: true,
    },
  },{ timestamps: true });

module.exports = model('Room', roomSchema)