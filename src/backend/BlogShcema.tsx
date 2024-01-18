import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    blogTitle: { type: String, required: true },
    editorHtml: { type: String, required: true },
    affliteLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NewBlog || mongoose.model("NewBlog", BlogSchema);
