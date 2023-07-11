const mongoose = require("mongoose");

const BigTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  list: [
    {
      type: String,
      required: true,
    },
  ],
  completed: { type: Boolean, default: false },
});

const BigTaskModel = mongoose.model("BigTask", BigTaskSchema);

module.exports = BigTaskModel;
