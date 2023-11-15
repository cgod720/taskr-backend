const express = require('express')
const users = express.Router()

const { createUser, getUsers } = require('../queries/users')



users.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ "error": "Internal Server Error" })
    }
})

users.post('/', async (req, res) => {
    try {
        const newUser = await createUser(req.body)
        res.status(201).json({ user: newUser })
    } catch (error) {
        res.status(500).json({ error: "Invalid information"})
    }
})



module.exports = users