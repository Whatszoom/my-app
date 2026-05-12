import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String, // store URL or path
      required: false, // make true if mandatory
    },
  },
  { timestamps: true },
);

export default mongoose.models.Test || mongoose.model("Test", TestSchema);
