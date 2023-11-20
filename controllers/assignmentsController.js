const express = require('express');
const assignments = express.Router({ mergeParams: true });
const { authenticateToken } = require('../auth/auth');
const { createAssignment, getAssignments, updateAssignment, deleteAssignment } = require('../queries/assignments');
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
        const assignments = await getAssignments(user_id);
        const user = await getUser(user_id);
        const { email, username } = user
        res.status(200).json({ username, email, user_id, assignments });
    } catch (error) {
        res.status(403).json({ error: "Must be logged in"});
    }
});

assignments.put('/:id', authenticateToken, async () => {
    try {
        const { id } = req.params;
        const updatedAssignment = await updateAssignment(id, req.body);
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(404).json({ error: "Assignment Not Found" });
    }
});

assignments.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deletedAssignment = await deleteAssignment(id);
        res.status(200).json({ message: "Assignment Successfully Deleted"});
    } catch (error) {
       res.status(404).json({ error: "Assignment Not Found"});
    }
});


module.exports = assignments;