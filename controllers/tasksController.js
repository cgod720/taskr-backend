const express = require('express');
const tasks = express.Router({ mergeParams: true });
const { authenticateToken } = require('../auth/auth');
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../queries/tasks');
const { getUser } = require('../queries/users');


tasks.get('/', authenticateToken, async (req, res) => {
    const { user_id } = req.params;
    try {
        const tasks = await getTasks(user_id);
        const user = await getUser(user_id);
        res.status(200).json({ ...user, tasks });
    } catch (error) {
        res.status(404).json({ error: "User Not Found"});
    }
})

tasks.get('/:id', authenticateToken, async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const task = await getTask(user_id, id);
        const user = await getUser(user_id);
        res.status(200).json({ ...user, task });
    } catch (error) {
        res.status(404).json({ error: "Task Not Found" });
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

tasks.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await updateTask(id, req.body)
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(403).json({ error: "Invalid Operation" })
    }
})

tasks.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await deleteTask(id);
        res.status(200).json(deletedTask)
    } catch (error) {
        res.status(404).json({ error: "Invalid Operation"})
    }
})

module.exports = tasks;