const router = require('express').Router();
const User = require('./Models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const user = new User({
        id: req.body.idl,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(401).send(error);
    }
});

module.exports = router;