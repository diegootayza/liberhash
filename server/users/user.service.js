require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../helpers/db')
const seq = require('sequelize')
const op = seq.Op

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getMyAccounts,
    getChildsIds,
    getReferrals,
}

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { username } })

    if (!user || !(await bcrypt.compare(password, user.hash))) throw 'Username or password is incorrect'

    // authentication successful
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
        expiresIn: '7d',
    })
    return { ...omitHash(user.get()), token }
}

async function getAll() {
    return await db.User.findAll()
}

async function getById(id) {
    return await getUser(id)
}

async function getUser(id) {
    const user = await db.User.findByPk(id)
    if (!user) throw 'User not found'
    return user
}

async function getMyAccounts(account) {
    let users
    if (account.type === 'admin' && !account.parent) {
        users = await db.User.findAll({ where: { parent: { [op.ne]: null } } })
    } else {
        users = await db.User.findAll({ where: { parent: account.id } })
    }
    if (!users) throw 'Users not found'
    return users
}

async function getChildsIds(id) {
    const users = await db.User.findAll({ where: { parent: id } })
    if (!users) throw 'no childs found'
    const ids = []
    for (const user of users) {
        if (user.cryp_id) {
            ids.push(user.cryp_id)
        }
    }
    return ids
}

async function getReferrals(username) {
    const referrals = await db.User.findAll({ where: { referral: username } })
    return referrals
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken'
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10)
    }

    // save user
    await db.User.create(params)
}

async function update(id, params) {
    const user = await getUser(typeof params.id !== 'undefined' ? params.id : id)

    // validate
    if (params.username) {
        if (params.username !== user.username) {
            if (await db.User.findOne({ where: { username: params.username } })) {
                throw 'Username "' + params.username + '" is already taken'
            }
        }
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10)
    }

    // copy params to user and save
    Object.assign(user, params)
    await user.save()

    return omitHash(user.get())
}

async function _delete(id) {
    const user = await getUser(id)
    await user.destroy()
}

// helper functions
function omitHash(user) {
    const { hash, ...userWithoutHash } = user
    return userWithoutHash
}
