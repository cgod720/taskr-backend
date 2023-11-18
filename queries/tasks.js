const db = require('../db/dbConfig')

const createTask = async (task) => {
    try {
        const newTask = await db.one("INSERT into tasks (title, description, due_date, priority, status, creator_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [task.title, task.description, task.due_date, task.priority, task.status, task.creator_id])

        return newTask
    } catch (error) {
        return error
    }
    

}

const getTasks = async (userId) => {
    try {
        const tasks = await db.any("SELECT * FROM tasks WHERE creator_id=$1", userId)
        return tasks
    } catch (error) {
        return error
    }
}

const getTask = async (userId, id) => {
    try {
        const task = await db.one("SELECT * FROM tasks WHERE creator_id=$1 AND task_id=$2", [userId, id])
        return task
    } catch (error) {
        return error
    }
}



module.exports = { createTask, getTasks, getTask }