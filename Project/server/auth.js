const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation');
const verify = require('./verifyToken');
const verifyRole = require('./verifyRole');
const User = require('./Models/User');

router.get('/users',verify,verifyRole.isAdmin,async (req,res) => {
    const allUsers = await User.find();
    return res.status(200).send(allUsers);
})
router.post('/',verify,verifyRole.isAdmin,async (req,res) => {
    const { error } = await registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({ $or:[ {username: req.body.username}, {email: req.body.email} ]});
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

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Wrong password');

    const token = jwt.sign(
        { email: user.email, userId: user.id, role: user.role },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "7d" });
    res.header('auth-token', token).status(200).send(token);
});
router.post('/logout',verify, (req, res) => {
    res.removeHeader('auth-token');
    console.log('Logged Out')
})

module.exports = router;