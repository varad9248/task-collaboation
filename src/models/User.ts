import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk authentication ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // List of projects user is part of
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
