import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String },
      project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
      assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assigned user
      status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
      priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
      dueDate: { type: Date },
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Task", TaskSchema);
  