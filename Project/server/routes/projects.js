const Project = require('../Models/Project');
const User = require('../Models/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { projectValidation } = require('../validation');
const auth = require('../verifyToken');
const verifyRole = require('../verifyRole');
const ROLES = require('../Models/Roles');

router.get("/", auth, verifyRole.isAdmin, async (req, res) => {

    const projects = await Project.find({ deleted: false });
    if (!projects.length) return res.status(204).send('There are no projects in the database')
    return res.status(200).send(projects)
})

router.post("/", auth, async (req, res) => {

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

    const userId = verified.userId
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).send("The user doesn't exists")
    req.body.managerId = userId;
    const { error } = await projectValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const project = new Project({
        name: req.body.name,
        managerId: userId.toString(),
        description: req.body.description,
        tasksId: req.body.tasksId,
        team: req.body.team
    })
    try {
        const savedProject = await project.save();
        res.status(201).send({ project: savedProject.projectId });
    } catch (error) {
        res.status(401).send(error);
    }
})
module.exports = router;