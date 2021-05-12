const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const auth = require('../verifyToken');
const verifyRole = require('../verifyRole');
const User = require('../Models/User');
const ROLES = require('../Models/Roles');

router.get('/', auth, verifyRole.isAdmin, async (req, res) => {
    const allUsers = await User.find();
    return res.status(200).send(allUsers);
})

router.post('/', auth, async (req, res) => {
    const { error } = await registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (user) return res.status(400).send('User already exists');

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role ? req.body.role : 'basic'
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).send({ user: savedUser.id });
    } catch (error) {
        res.status(401).send(error);
    }
})

//{userId}
router.get('/:userId', auth, async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).send('Invalid UserID');

    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).send("The user doesn't exists")

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    if (verified.role === ROLES.ROLES.ADMIN || verifyRole.isSameUser(req)) {
        return res.status(200).send(user);
    }
    else {
        return res.status(401).send('Unauthorized');
    }
})

router.post('/:userId', auth, async (req, res) => {
    // const { userId } = req.params;
    // if (!userId) return res.status(400).send('Invalid UserID');

    // const user = await User.findOne({ id: userId });
    // if (!user) return res.status(400).send("The user doesn't exists")

    // const token = req.header('auth-token');
    // const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    // if (verifyRole.isAdmin || userId === verified.id) {
    //     return res.status(200).send(user);
    // }
    // else {
    //     return res.status(401).send('Unauthorized');
    // }
})
module.exports = router;