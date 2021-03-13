const express = require('express');
const app = express();
const authRoute= require('./auth')

app.use(express.json())
app.use('/api/user',authRoute)

app.listen(3000, () => {
    console.log('server started')
})

app.get('/users', async (req, res) => {
    
})