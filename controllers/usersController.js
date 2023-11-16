const express = require('express')
const users = express.Router()
require('dotenv').config()
const secretKey = process.env.SECRET

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
        const token = jwt.sign({ userId: createdUser.user_id, username: createdUser.username }, secretKey);

        res.status(201).json({ user: newUser, token });
        // res.status(201).json({ user: newUser })
    } catch (error) {
        res.status(500).json({ error: "Invalid information"})
    }
})



module.exports = users