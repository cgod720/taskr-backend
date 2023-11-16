const express = require('express');
const tasks = express.Router();
const { authenticateToken } = require('../auth/auth');
const { createTask } = require('../queries/tasks');


tasks.post('/', authenticateToken, async (req, res) => {
    try {
        const task = await createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = tasks;