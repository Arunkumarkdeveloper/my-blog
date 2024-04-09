import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    blogTitle: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    urlLink: { type: String, required: true, unique: true },
    seoKeywords: { type: Array, required: true },
    editorHtml: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NewBlog || mongoose.model("NewBlog", BlogSchema);
