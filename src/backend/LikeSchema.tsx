import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
});

export default mongoose.models.Likes || mongoose.model("Likes", LikeSchema);
