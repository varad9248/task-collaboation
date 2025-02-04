import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
      chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom", required: true },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
      type: { type: String, enum: ["text", "image", "file"], default: "text" },
      seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track who has read the message
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Message", MessageSchema);
  