require('dotenv').config()
const express = require('express');
const logger = require('morgan')
const app = express();
const cors = require('cors');
const mongoose = require('./mongoose');
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')


const corsOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json())
app.use('/api', authRoute)
app.use('/api/users', usersRoute)

app.listen(3001, () => {
    console.log('server started')
})