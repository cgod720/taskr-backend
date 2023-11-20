const db = require('../db/dbConfig');


const createAssignment = async (taskId, assigneeId, assignedById) => {
    try {
        const assignment = db.one("INSERT INTO assignments (task_id, assignee_id, assigned_by_id) VALUES ($1, $2, $3) RETURNING *", [taskId, assigneeId, assignedById]);
        return assignment;
    } catch (error) {
        return error;
    }
};

const getAssignments = async (userId) => {
    try {
        const assignments = db.any("SELECT * FROM assignments WHERE assignee_id=$1", userId);
        return assignments;
    } catch (error) {
        return error;
    }
};

const updateAssignment = async (id, assignment) => {
    try {
        const updatedAssignment = await db.one("UPDATE assignments SET assignee_id=$1, task_id=$2, assigned_by_id=$3 WHERE assignmnent_id=$4", [assignment.assignee_id, assignment.task_id, assignment.assigned_by_id, id]);
        return updatedAssignment;
    } catch (error) {
        return error;
    }
};

const deleteAssignment = async (id) => {
    try {
        const deletedAssignment = await db.one("DELETE from assignments WHERE assignment_id=$1", id);
        return deletedAssignment;
    } catch (error) {
        return error;
    }
}


module.exports = { 
    createAssignment, 
    getAssignments, 
    updateAssignment, 
    deleteAssignment 
};

