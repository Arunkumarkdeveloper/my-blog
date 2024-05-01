import mongoose from "mongoose";

const Ecommerce = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    buyLink: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Ecommerce ||
  mongoose.model("Ecommerce", Ecommerce);
