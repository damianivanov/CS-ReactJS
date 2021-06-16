const Project = require('../Models/Project');
const User = require('../Models/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { projectValidation } = require('../validation');
const verifyToken = require('../verifyToken');
const verifyRoleOrSelf = require('../verifyRole');
const sendErrorResponse = require("../utils").sendErrorResponse;
const replaceId = require("../utils").replaceId;

router.get("/",verifyToken, verifyRoleOrSelf(3,false), async (req, res) => {

    const projects = await Project.find();
    if (!projects) return sendErrorResponse(req, res, 204, `No Projects`);
    return res.status(200).send(projects)
})

router.post("/",verifyToken, verifyRoleOrSelf(2,false), async (req, res) => {

    const { error } = await projectValidation(req.body);
    if (error) return sendErrorResponse(req, res, 400, error.details[0].message, error);

    const project = new Project({
        name: req.body.name,
        managerId: req.body.managerId,
        description: req.body.description,
        tasksId: req.body.tasksId,
        team: req.body.team,
        company: req.body.company,
        deleted: false,
    })
    try {
        const savedProject = await project.save();
        replaceId(savedProject); 
        const uri = req.baseUrl + `/${savedProject.id}` ;
        console.log('Created Project: ', savedProject.name);
        return res.location(uri).status(201).json(savedProject);
    } catch (error) {
        sendErrorResponse(req, res, 500, `Server error: ${error}`, error);
    }
})

router.get( "/myprojects/:userId",verifyToken, verifyRoleOrSelf(3, true), async (req, res) => {
  const { userId } = req.params;
  if (!userId) return sendErrorResponse(req, res, 400, `Missing userId`);
  
  const projects = await Project.find({ team: userId,deleted:false });
  if (!projects) sendErrorResponse(req, res, 204, `There is no projects with this user`);
  
    return res.status(200).send(projects);
});

router.get( "/:projectId",verifyToken, verifyRoleOrSelf(2, false), async (req, res) => {
    const { projectId } = req.params;
    if (!projectId) return sendErrorResponse(req, res, 400, `Missing projectId`);
    
    const user = req.user
    const project = await Project.findOne({ _id: projectId });
    if (!project) sendErrorResponse(req, res, 204, `There is no project with this id`);
    
    if (user.id === project.managerId || user.role === "admin") {
      if (project.deleted)
      return sendErrorResponse(req, res, 400, `Project is deleted.`);
      return res.status(200).send(project);
    }
    return sendErrorResponse(req, res, 403, `Not enough privilegies.`);
  }
);

router.put("/:projectId", verifyToken,verifyRoleOrSelf(2,false), async (req, res) => {
    const { projectId } = req.params;
    if (!projectId) return sendErrorResponse(req, res, 400, `Missing projectId`);
    
    const user = req.user
    const project = req.body
    const { error } = await projectValidation(project);
    if (error) return sendErrorResponse(req, res, 400, error.details[0].message, error);
  
  delete (project.id);
  try {
    if (user.id === project.managerId || user.role === "admin") {
      if (project.deleted)
        return sendErrorResponse(req, res, 400, `Project is deleted.`);
      const updated = await Project.findOneAndUpdate(
        { _id: projectId },
        project,
        {
          new: true,
        }
      );
      return res.status(200).send(updated);
    }
  } catch (error) {
    sendErrorResponse(req, res, 400, `Error while saving the project.`);
  }
});

router.delete( "/:projectId", verifyToken, verifyRoleOrSelf(2, false), async (req, res) => {
    const { projectId } = req.params;
    if (!projectId) return sendErrorResponse(req, res, 400, `Missing projectId`);
    
    const user = req.user
    const project = await Project.findOne({ _id: projectId });
    if (!project) sendErrorResponse(req, res, 204, `There is no project with this id`);
    
    if(user.id===project.managerId || user.role==='admin'){
        if (project.deleted) return sendErrorResponse(req, res, 400, `Project is deleted.`);
        project.deleted = true;
        await project.save();
        return res.status(200).send({message:`Project- ${project.name} was deleted`});
    }
    return sendErrorResponse(req, res, 403, `Not enough privilegies.`);
  }
);

module.exports = router;