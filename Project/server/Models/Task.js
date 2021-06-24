const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      reuqired: true,
    },
    assignorId: {
      type: String,
      required: true,
    },
    assigneeId: {
      type: String,
      reuqired: true,
    },
    label: {
      type: String,
      max: 256,
    },
    description: {
      type: String,
      max: 4096,
    },
    status: {
      type: String,
      required: true,
      //active
      //done
      //review
    },
    subTasks: {
      type: [String],
    },
    taskResult: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    dueDate: {
      type: Date,
    },
    deleted: {
      type:Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
