import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of users
      tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Associated tasks
      chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" }, // Linked chat room
      isPrivate: { type: Boolean, default: true },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Project", ProjectSchema);
  