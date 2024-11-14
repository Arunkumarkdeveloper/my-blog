import mongoose from "mongoose";

const Blog = new mongoose.Schema({
  blogData: { type: Object, required: true },
  keywords: { type: Array, required: true },
  pageUrl: { type: String, required: true, unique: true },
  date: { type: Object, required: true },
});

export default mongoose.models.Blog || mongoose.model("Blog", Blog);
