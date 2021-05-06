const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('./mongoose');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation');
const { json } = require('body-parser');
const verify = require('./verifyToken');
const User = require('./Models/User');

router.post('/register', async (req, res) => {
    const { error } = registerValidation.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user is in the database 
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).send('Email already exists');

    const username = await User.findOne({ username: req.body.username });
    if (username) return res.status(400).send('Username already exists');

    const user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    });
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser.id });
    } catch (error) {
        res.status(401).send(error);
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: username })
    if (!user) return res.status(400).send('There is no registered user with this username');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Wrong password');

    //create JWT
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);
});

router.post('/logout', verify, (req, res) => {
    res.removeHeader('auth-token');
})

module.exports = router;