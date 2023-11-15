const express = require('express')
const cors = require('cors')
const app = express()


// Middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.json({ greeting: "Hello you must be lost", try: "'/tasks' to view available data"})
})


module.exports = app