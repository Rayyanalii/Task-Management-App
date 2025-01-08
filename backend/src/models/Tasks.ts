import mongoose, { Document, Schema } from "mongoose";

interface TaskInterface extends Document {
  title: string;
  description: string;
  completed: boolean;
  userId: mongoose.Schema.Types.ObjectId;
}

const TaskSchema = new Schema<TaskInterface>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
});

const Task = mongoose.model<TaskInterface>("Task", TaskSchema);

export default Task;
