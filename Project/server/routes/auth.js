const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const auth = require('../verifyToken');
const User = require('../Models/User');

router.post('/register', async (req, res) => {

    const { error } = await registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user is in the database 
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send('Email already exists');

    const username = await User.findOne({ username: req.body.username });
    if (username) return res.status(400).send('Username already exists');

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: 'basic'
    })
    try {
        const savedUser = await user.save();
        res.status(201).send({ user: savedUser.id });
    } catch (error) {
        res.status(401).send(error);
    }
});
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const tokenOld = req.header('auth-token');
    if (tokenOld) return res.status(403).send('Already Logged In')

    const user = await User.findOne({ username: username })
    if (!user) return res.status(400).send('There is no registered user with this username');
    if (user.deleted) return res.status(400).send('This user has been deleted');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Wrong password');

    const token = jwt.sign(
        { email: user.email, userId: user.id, role: user.role },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "7d" });
    res.header('auth-token', token).status(200).send(token);
});
router.post('/logout', auth, (req, res) => {
    res.removeHeader('auth-token');
    return res.status(200).send('Logged Out')
})

module.exports = router;