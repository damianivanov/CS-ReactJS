const express = require('express');
const app = express()
const users = [{ name: "Damian", age: 22 }]

app.listen(3000, () => {
    console.log('server started')
})

app.get('/users', async (req, res) => {
    const pass = await bcrypt.hash("password12",10);
    console.log(pass);
})