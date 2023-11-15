const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Taskr is online, accepting requests on port: ${PORT}..`)
})