const express = require('express');
const assignments = express.Router({ mergeParams: true });
const { authenticateToken } = require('../auth/auth');
const { createAssignment } = require('../queries/assignments');



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

