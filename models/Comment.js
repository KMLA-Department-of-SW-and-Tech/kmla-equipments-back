import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", CommentSchema);
