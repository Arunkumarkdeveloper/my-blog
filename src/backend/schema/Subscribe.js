import mongoose from "mongoose";

const Subscribe = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  date: { type: Object, required: true },
});

export default mongoose.models.Subscribe ||
  mongoose.model("Subscribe", Subscribe);
