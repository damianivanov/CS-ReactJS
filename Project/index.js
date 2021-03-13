const express = require('express');
const dotenvt = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const authRoute= require('./auth')
dotenvt.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("Connected to db")        
)

app.use(express.json())
app.use('/api/user',authRoute)

app.listen(3000, () => {
    console.log('server started')
})

app.get('/users', async (req, res) => {
    
})