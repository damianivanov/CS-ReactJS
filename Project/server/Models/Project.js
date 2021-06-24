const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3, max: 128 },
    company: { type: String, min: 3, max: 128 },
    managerId: { type: String, required: true },
    description: { type: String, max: 4096 },
    photo: { type: String},
    tasksId: { type: [String] },
    team: { type: [String] },
    deleted: { type: Boolean, default: false },
    invitationCode: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
projectSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
