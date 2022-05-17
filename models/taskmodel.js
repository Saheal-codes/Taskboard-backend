const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    task_name: {
      type: String,
      required: true,
    },
    task_description: {
      type: String,
      required: true,
    },
    task_status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
