import mongoose from "mongoose";

import Comment from "./Comment.js";
const { Schema } = mongoose;

const EquipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  registerdOn: {
    type: Date,
    default: Date.now,
  },
  isRegisterd: {
    type: Boolean,
    default: false,
  },
  whoRegistered: {
    type: String,
    default: "Not registered"
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },
  errors :{
    type: [Schema.Types.ObjectId],
    ref: "Error",
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Equip", EquipSchema);
