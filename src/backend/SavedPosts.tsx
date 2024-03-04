import mongoose from "mongoose";

const SavedPosts = new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.models.SavedPosts ||
  mongoose.model("SavedPosts", SavedPosts);
