const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation');
const auth = require('../verifyToken');
const verifyRole = require('../verifyRole');
const User = require('../Models/User');
const ROLES = require('../Models/Roles');

router.get('/', auth, verifyRole.isAdmin, async (req, res) => {
    const allUsers = await User.find({ deleted: false });
    if (!allUsers) return res.status(204).send('There are no users in the database')
    return res.status(200).send(allUsers);
})
router.post('/', auth, verifyRole.isAdmin, async (req, res) => {
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
router.patch('/:userId', auth, async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).send('Invalid UserID');

    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).send("The user doesn't exists")
    if (user.deleted) return res.status(400).send("The user is already deleted")

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    if (verified.role === ROLES.ROLES.ADMIN || verifyRole.isSameUser(req)) {
        if (sameUser) { delete req.body.role; delete req.body.password };
        const savedUser = await User.findOneAndUpdate({ id: userId }, req.body, { new: true });
        return res.status(200).send(savedUser);
    }
    else {
        return res.status(401).send('Unauthorized');
    }
})
router.delete('/:userId', auth, async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).send('Invalid UserID');

    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).send("The user doesn't exists")

    if (user.deleted) return res.status(400).send("The user is already deleted")

    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    if (verified.role === ROLES.ROLES.ADMIN || verifyRole.isSameUser(req)) {
        user.deletedDate = Date.now();
        await user.save();
        return res.send(200).send(`user ${user.username} was deleted`)
    }
    else {
        return res.status(401).send('Unauthorized');
    }
})

module.exports = router;