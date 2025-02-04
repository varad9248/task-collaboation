import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
    {
      project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // If it's a project-based chat
      members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
      isGroupChat: { type: Boolean, default: false },
      name: { type: String }, // Only for group chats
    },
    { timestamps: true }
  );
  
  export default mongoose.model("ChatRoom", ChatRoomSchema);
  