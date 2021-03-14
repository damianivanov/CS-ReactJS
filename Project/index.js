const express = require('express');
const app = express(); 
const authRoute = require('./auth')
const router = require('./profile')

app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/profile', router)

app.listen(3000, () => {
    console.log('server started')
})
