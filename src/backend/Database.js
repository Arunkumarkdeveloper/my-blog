const mongoose = require("mongoose");

export const Database = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database not connected", error);
  }
};
