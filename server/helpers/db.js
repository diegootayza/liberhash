require('dotenv').config()
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')

module.exports = db = {}

initialize()

async function initialize() {
    const { DB_ENDPOINT, DB_USERNAME, DB_PASS, DB_PORT, DB_DATABASE } = process.env
    const connection = await mysql.createConnection({ host: DB_ENDPOINT, port: DB_PORT, user: DB_USERNAME, password: DB_PASS })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`)

    // connect to db
    const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASS, { dialect: 'mysql', logging: false, host: DB_ENDPOINT })

    // init models and add them to the exported db object
    db.User = require('../models/user.model')(sequelize)

    // sync all models with database
    await sequelize.sync()
}
