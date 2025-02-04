import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
      task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      content: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Comment", CommentSchema);
  