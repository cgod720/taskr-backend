const express = require('express');
const tasks = express.Router({ mergeParams: true });
const { authenticateToken } = require('../auth/auth');
const { createTask, getTasks } = require('../queries/tasks');
const { getUser } = require('../queries/users');


tasks.get('/', authenticateToken, async (req, res) => {
    const { user_id } = req.params;
    try {
        const tasks = await getTasks(user_id)
        const user = await getUser(user_id)
        res.status(200).json({ user, tasks })
    } catch (error) {
        res.status(404).json({ error: "User Not Found"})
    }
})

tasks.post('/', authenticateToken, async (req, res) => {
    try {
        const task = await createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = tasks;