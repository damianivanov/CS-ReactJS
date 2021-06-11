const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const auth = require('../verifyToken');
const User = require('../Models/User');

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send('There is no registered user with this username');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Wrong password');

    const token = jwt.sign(
        {userId: user.id, role: user.role },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "7d" });
    return res.status(200).send(token);
});

router.post('/logout', auth, (req, res) => {
    res.removeHeader('auth-token');
    return res.status(200).send('Logged Out')
})

module.exports = router;