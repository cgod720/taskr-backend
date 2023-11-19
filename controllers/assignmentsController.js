const express = require('express');
const assignments = express.Router({ mergeParams: true });
const { authenticateToken } = require('../auth/auth');
const { createAssignment, getAssignments } = require('../queries/assignments');
const { getUser } = require('../queries/users')



assignments.post('/', authenticateToken, async (req, res) => {
    const { user_id } = req.params;
    const { task_id, assignee_id } = req.body
    try {
        const assignment = await createAssignment(task_id, assignee_id, user_id);
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ error: "Cannot Post Assignment"});
    }
})


assignments.get('/', authenticateToken, async (req, res) => {
    try {
        const { user_id } = req.params;
        const assignments = await getAssignments(user_id)
        const user = await getUser(user_id)
        res.status(200).json({ ...user, assignments })
    } catch (error) {
        res.status(403).json({ error: "Must be logged in"})
    }
});


module.exports = assignments;