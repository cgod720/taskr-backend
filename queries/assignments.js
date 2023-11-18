const db = require('../db/dbConfig');


const createAssignment = async (taskId, assigneeId, assignedById) => {
    try {
        const assignment = db.one("INSERT INTO assignments (task_id, assignee_id, assigned_by_id) VALUES ($1, $2, $3) RETURNING *", [taskId, assigneeId, assignedById]);
        return assignment;
    } catch (error) {
        return error;
    }
}


module.exports = { createAssignment };

