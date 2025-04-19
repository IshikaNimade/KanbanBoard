const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: {
      type: String,
      default: "My Board",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", boardSchema);
