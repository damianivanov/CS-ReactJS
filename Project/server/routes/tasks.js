const Project = require("../Models/Project");
const Task = require("../Models/Task");
const User = require("../Models/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { taskValidation } = require("../validation");
const verifyToken = require("../verifyToken");
const {verifyRoleOrSelf}= require("../verifyRole");
const sendErrorResponse = require("../utils").sendErrorResponse;

router.get("/mytasks", verifyToken,verifyRoleOrSelf(1,false), async (req, res) => {
  const tasks = await Task.find({ assigneeId: req.userId })
  return res.json(tasks);
});

//active tasks
router.get("/myActiveTasks", verifyToken,verifyRoleOrSelf(1,false), async (req, res) => {
  const tasks = await Task.find({
    $or: [{ assigneeId: req.userId }, { assignorId: req.userId }],
    status: { $in: ["active", "review"] },
  });
  return res.json(tasks);
});

router.get("/", verifyToken, verifyRoleOrSelf(3, false), async (req, res) => {
  const tasks = await Task.find();
  if (!tasks) return sendErrorResponse(req, res, 204, `No Tasks`);
  return res.status(200).send(tasks);
});

router.post("/", verifyToken, verifyRoleOrSelf(2, false), async (req, res) => {
  const { error } = await taskValidation(req.body);
  if (error)
    return sendErrorResponse(req, res, 400, error.details[0].message, error);

  const project = await Project.findOne({ _id: req.body.projectId });
  const assignor = await User.findOne({ _id: req.body.assignorId });
  const assignee = await User.findOne({ _id: req.body.assigneeId });

  if (!assignor || !assignee || !project)
    return sendErrorResponse(req, res, 404, "Invalid Parameters");
  if (!project.team.includes(assignee.id))
    return sendErrorResponse(req, res, 400, `Assignee it's not in the project`);
  if (project.managerId !== assignor.id && req.user.role !== "admin")
    return sendErrorResponse(req, res, 400, `Assigner it's not in the project`);

  const task = new Task({
    projectId: req.body.projectId,
    assignorId: req.body.assignorId,
    assigneeId: req.body.assigneeId,
    label: req.body.label,
    description: req.body.description,
    status: req.body.status ? req.body.status : "active",
    subTasks: req.body.subTasks ? req.body.subTasks: [],
    taskResult: req.body.taskResult ? req.body.taskResult : "",
    deleted: false,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
  });
  
  project.tasksId.push(task.id);
  assignee.tasks.push(task.id)
  try {
    const savedTasks = await task.save();
    await project.save();
    await assignee.save();
    const uri = req.baseUrl + `/${savedTasks.id}`;
    console.log("Created Task: ", savedTasks.label);
    return res.location(uri).status(201).json(savedTasks);
  } catch (error) {
    return sendErrorResponse(req, res, 500, `Server error: ${error}`, error);
  }
});

router.get("/:taskId",verifyToken, verifyRoleOrSelf(1, false), async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) return sendErrorResponse(req, res, 400, `Missing taskId`);

    const task = await Task.findOne({ _id: taskId });
    if (!task || (task.assigneeId!==req.userId && task.assignorId!==req.userId))
      return sendErrorResponse(req, res, 400, `There is no task with this id`);
    const assignor = await User.findOne({_id: task.assignorId}).select("username").lean()
    const assignee = await User.findOne({_id: task.assigneeId}).select("username").lean()
    const subTasks = await Task.find({_id: {$in: task.subTasks}})
    return res.status(200).send({task,assignee,assignor,subTasks});
  }
);

router.put("/:taskId", verifyToken,verifyRoleOrSelf(2,false), async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) return sendErrorResponse(req, res, 400, `Missing taskId`);

  const task = req.body;

  const { error } = await taskValidation(task);
  if (error)
    return sendErrorResponse(req, res, 400, error.details[0].message, error);

  if (task.assignorId !== req.userId && req.user.role !== "admin")
    return sendErrorResponse(req, res, 400, `Only the assignor can edit task`);
    
  try {
    const updated = await Task.findOneAndUpdate({ _id: taskId }, task, {
      new: true,
    });
    return res.status(200).send(updated);
  } catch (error) {
    return sendErrorResponse(req, res, 400, `Error while saving the task.`);
  }
});

router.delete("/:taskId", verifyToken, verifyRoleOrSelf(2, false), async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) return sendErrorResponse(req, res, 400, `Missing taskId`);

  const task = await Task.findOne({ _id: taskId });
  if (!task) 
    return sendErrorResponse(req, res, 400, `There is no task with this id`);

  if (task.assignorId !== req.userId && req.user.role !== "admin")
    return sendErrorResponse(req, res, 403, `Only the assignor can edit task`);

  if (task.deleted)
    return sendErrorResponse(req, res, 400, `Task is already deleted.`);

    task.status="done"
  task.deleted = true;
  await task.save();
  return res.status(200).send({ message: `Task - ${task.label} was deleted` });
});

//subtasks crud
router.post("/:taskId",verifyToken, verifyRoleOrSelf(2, false), async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) return sendErrorResponse(req, res, 400, `Missing taskId`);

  const task = await Task.findOne({ _id: taskId });
  if (!task || (task.assigneeId!==req.userId && task.assignorId!==req.userId && req.user.role!=="admin"))
     return sendErrorResponse(req, res, 400, `There is no task with this id`);

  
  const { error } = await taskValidation(req.body);
  if (error)
    return sendErrorResponse(req, res, 400, error.details[0].message, error);

  const project = await Project.findOne({ _id: req.body.projectId });
  const assignor = await User.findOne({ _id: req.body.assignorId });
  const assignee = await User.findOne({ _id: req.body.assigneeId });

  if (!assignor || !assignee || !project)
    return sendErrorResponse(req, res, 404, "Invalid Parameters");
  if (!project.team.includes(assignee.id))
    return sendErrorResponse(req, res, 400, `Assignee it's not in the project`);
  if (project.managerId !== assignor.id && req.user.role !== "admin")
    return sendErrorResponse(req, res, 400, `Assigner it's not in the project`);

  const subTask = new Task({
    projectId: req.body.projectId,
    assignorId: req.body.assignorId,
    assigneeId: req.body.assigneeId,
    label: req.body.label,
    description: req.body.description,
    status: req.body.status ? req.body.status : "active",
    subTasks: req.body.subTasks ? req.body.subTasks: [],
    taskResult: req.body.taskResult ? req.body.taskResult : "",
    deleted: false,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
  });
  
  project.tasksId.push(subTask.id)
  assignee.tasks.push(subTask.id)
  task.subTasks.push(subTask.id)

  try {
    const savedTasks = await subTask.save();
    await project.save();
    await assignee.save();
    await task.save();
    const uri = req.baseUrl + `/${savedTasks.id}`;
    console.log(`Created Subtask of ${task.label}: `, savedTasks.label);
    return res.location(uri).status(201).json(savedTasks);
  } catch (error) {
    return sendErrorResponse(req, res, 500, `Server error: ${error}`, error);
  }
});

router.get("/:taskId/results", verifyToken,verifyRoleOrSelf(1,false), async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) return sendErrorResponse(req, res, 400, `Missing taskId`);

  const task = await Task.findOne({ _id: taskId })
  const assignee= await User.findOne({_id:task.assigneeId})
  if(task.assigneeId===req.userId || task.assignorId===req.userId || req.user.role==="admin"){
    return res.json({Result:task.taskResult,Status:task.status,Modified: task.updatedAt,subTasks:task.subTasks,Assignee:assignee});
  }
  else
    return sendErrorResponse(req, res, 400, `Only the assignor and assignee can view this task`);
});

router.post("/:taskId/results", verifyToken,verifyRoleOrSelf(1,false), async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) return sendErrorResponse(req, res, 400, `Missing taskId`);

  const taskResult = req.body;
  const task = await Task.findOne({ _id: taskId })

  if (task.assignorId !== req.userId && req.user.role !== "admin" && task.assigneeId !== req.userId)
    return sendErrorResponse(req, res, 400, `Only the assignor can edit task`);
    
  try {
    const updated = await Task.findOneAndUpdate({ _id: taskId }, taskResult, {
      new: true,
    });
    return res.status(200).send(updated);
  } catch (error) {
    return sendErrorResponse(req, res, 400, `Error while saving the task.`);
  }
});





module.exports = router;
