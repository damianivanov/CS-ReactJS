const verify = require('./verifyToken');
const router = require('express').Router();

router.get('/posts', verify, (req, res) => {
    res.json({
        posts: {
            title: "asdasd",
            description: "des"
        }
    })
})

module.exports = router;
