const db = require('../db/dbConfig');


const createAssignment = async (taskId, assigneeId, assignedById) => {
    try {
        const assignment = db.one("INSERT INTO assignments (task_id, assignee_id, assigned_by_id) VALUES ($1, $2, $3) RETURNING *", [taskId, assigneeId, assignedById]);
        return assignment;
    } catch (error) {
        return error;
    }
}

const getAssignments = async (userId) => {
    try {
        const assignments = db.any("SELECT * FROM assignments WHERE assignee_id=$1", userId);
        return assignments;
    } catch (error) {
        return error;
    }
}


module.exports = { createAssignment, getAssignments };

