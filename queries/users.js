const db = require('../db/dbConfig')
const bcrypt = require('bcrypt')


const createUser = async (user) => {
    const salt = 10
    const hash = await bcrypt.hash(user.password_hash, salt)
    const newUser = await db.one("INSERT INTO users (username, email, password_hash) VALUES($1, $2, $3) RETURNING *", [user.username, user.email, hash])
    return newUser
}

const getUsers = async () => {
    const users = await db.any("SELECT * FROM users")
    return users
}


module.exports = { createUser, getUsers }