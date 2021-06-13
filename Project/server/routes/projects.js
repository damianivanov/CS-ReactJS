const Project = require('../Models/Project');
const User = require('../Models/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { projectValidation } = require('../validation');
const verifyToken = require('../verifyToken');
const verifyRoleOrSelf = require('../verifyRole');
const sendErrorResponse = require("../utils").sendErrorResponse;
const replaceId = require("../utils").replaceId;

router.get("/", verifyRoleOrSelf(3,false), async (req, res) => {

    const projects = await Project.find();
    if (!projects) return sendErrorResponse(req, res, 204, `No Projects`);
    return res.status(200).send(projects)
})

router.post("/", verifyRoleOrSelf(2,false), async (req, res) => {

    const { error } = await projectValidation(req.body);
    if (error) return sendErrorResponse(req, res, 400, error.details[0].message, error);

    const project = new Project({
        name: req.body.name,
        managerId: req.body.managerId,
        description: req.body.description,
        tasksId: req.body.tasksId,
        team: req.body.team,
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

module.exports = router;