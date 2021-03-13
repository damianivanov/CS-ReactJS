const router = require('express').Router();
const User = require('./Models/User');
const bcrypt = require('bcrypt');
const mongoose = require('./mongoose');
const {registerValidation,loginValidation} = require('./validation');

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user is in the database 
    const email = await User.findOne({email: req.body.email});
    if (email) return res.status(400).send('Email already exists');

    const username = await User.findOne({username: req.body.username});
    if (username) return res.status(400).send('Username already exists');

    const user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    try {
        const savedUser = await user.save();
        res.send({user: savedUser.id});
    } catch (error) {
        res.status(401).send(error);
    }
});

router.post('/login', async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const error = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({username: username})
    if(!user) return res.status(400).send('There is no registered user with this username');

    const validPassword = await bcrypt.compare(user.password,req.body.password);
    if(!validPassword) return res.status(400).send('Wrong password');
    res.send('Logged In!')
});

module.exports = router;