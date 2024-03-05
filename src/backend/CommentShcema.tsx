import mongoose from "mongoose";

const Comment = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    userName: { type: String, required: true },
    userId: { type: String, required: true },
    commentText: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model("Comment", Comment);
