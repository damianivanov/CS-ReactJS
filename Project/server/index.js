require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')

const mongoose = require('./mongoose');
const nodemailer = require("nodemailer");
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const tasksRoute = require('./routes/tasks')
const projectsRoute = require('./routes/projects')
const sendErrorResponse = require('./utils').sendErrorResponse;

const corsOptions = {
    origin: 'http://localhost:3000', // react server
}
app.use(morgan("dev"))
app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}));
app.use(express.static('public'))
app.use('/api/users', usersRoute)
app.use('/api/tasks',tasksRoute)
app.use('/api/projects', projectsRoute)
app.use('/api', authRoute)


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

app.post("/api/send", function (req, res) {
    let mailOptions = {
        from: process.env.EMAIL,
        to: "damian.ivanovv@gmail.com",
        subject: req.subject,
        text: req.text,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
            res.json({ status: "Email sent" });
        }
    });
});

app.post('/captcha', function (req, res) {
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseError": "something goes to wrong" });
    }
    const secretKey = reCAPTCHA_SECRET_KEY;

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.socket.remoteAddress;

    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ "responseError": "Failed captcha verification" });
        }
        res.json({ "responseSuccess": "Sucess" });
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
})

app.listen(3002, () => {
    console.log('server started')
})