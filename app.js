const express = require('express')
const cors = require('cors')
const app = express()
const userController = require('./controllers/usersController')
const taskController = require('./controllers/tasksController')


// Middleware
app.use(cors())
app.use(express.json())
app.use('/users', userController)


app.get('/', (req, res) => {
    res.json({ greeting: "Hello you must be lost" })
})


module.exports = app