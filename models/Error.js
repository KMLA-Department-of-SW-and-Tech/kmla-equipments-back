import mongoose from "mongoose";

const { Schema } = mongoose;

const ErrorSchema = new mongoose.Schema({
  equip: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isFixed: {
    type: Boolean,
    default: false,
  },
  whoFixed: {
    type: String,
  },
});

export default mongoose.model("Error", ErrorSchema);
