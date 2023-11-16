const express = require('express')
const users = express.Router()
require('dotenv').config()
const secretKey = process.env.SECRET
const jwt = require('jsonwebtoken')

const { createUser, getUsers, logInUser } = require('../queries/users')
const { authenticateToken } = require('../auth/auth')



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
        const token = jwt.sign({ userId: newUser.user_id, username: newUser.username }, secretKey);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Invalid information", info: error });
    }
})

users.post('/login', async (req, res) => {
    try {
        const user = await logInUser(req.body);
        const token = jwt.sign({ userId: user.user_id, username: user.username }, secretKey);
        res.status(200).json({ user, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error', info: error });
    }
})



module.exports = users;