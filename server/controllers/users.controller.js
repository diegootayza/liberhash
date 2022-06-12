const { encrypt } = require('../helpers/crypto')
const authorize = require('../middleware/authorize')
const Crypvestor = require('../crypvestor')
const express = require('express')
const Joi = require('joi')
const moment = require('moment')
const router = express.Router()
const userService = require('../users/user.service')
const validateRequest = require('../middleware/validate-request')

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    validateRequest(req, next, schema)
}

function authenticate(req, res, next) {
    userService
        .authenticate(req.body)
        .then((user) => res.json(user))
        .catch(next)
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        cryp_id: Joi.number(),
        strategy: Joi.number(),
        type: Joi.string(),
        referral: Joi.string().allow('', null),
    })
    validateRequest(req, next, schema)
}

function register(req, res, next) {
    let toSave = req.body
    toSave.parent = req.user.id
    userService
        .create(toSave)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next)
}

function getAll(req, res, next) {
    userService
        .getAll()
        .then((users) => res.json(users))
        .catch(next)
}

async function getCurrent(req, res, next) {
    let user = req.user
    if (user.type === 'admin') {
        user.childs = await userService.getChildsIds(user.id)
    }
    res.json(user)
}

async function getStats(req, res, next) {
    let account = []
    if (typeof req.query.account !== 'undefined' && req.query.account !== 'false') {
        account = req.query.account.map((acc) => 'accounts[]=' + acc)
    }
    const stats = await Crypvestor.get('/v1/stats?' + account.join('&'))
    res.json(stats)
}

async function getCharts(req, res, next) {
    const date = moment().subtract(1, 'month').format('YYYY-MM-DD')
    let account = ''
    if (typeof req.query.account !== 'undefined' && req.query.account !== 'false') {
        account = req.query.account
    }
    const charts = await Crypvestor.get('/dashboard/pnl/date/' + date + '/binance-account/' + account)
    res.json(charts)
}

async function getPie(req, res, next) {
    const pie = await Crypvestor.get('/dashboard/capital-distribution')
    res.json(pie)
}

async function getAlgos(req, res, next) {
    const algos = await Crypvestor.get('/v1/strategies')
    res.json(algos)
}

async function getAccounts(req, res, next) {
    const myAccounts = await userService.getMyAccounts(req.user)
    res.json(myAccounts)
}

async function getReferrals(req, res, next) {
    const referrals = await userService.getReferrals(req.user.username)
    res.json(referrals)
}

async function getGraphBalance(req, res, next) {
    const date = moment().subtract(1, 'month').format('YYYY-MM-DD')
    const accounts = await Crypvestor.get('/dashboard/graph-balances/date/' + date + '/binance-account/' + req.query.account + '?is_trading_section=0')
    res.json(accounts)
}

async function getBalance(req, res, next) {
    const accounts = await Crypvestor.get('/binance-account/api-data/' + req.params.id)
    res.json(accounts)
}

async function getStatuses(req, res, next) {
    const statuses = await Crypvestor.get('/order-statuses')
    res.json(statuses)
}

async function getOpenOrders(req, res, next) {
    let account = []
    if (typeof req.query.account !== 'undefined' && req.query.account !== 'false') {
        account = req.query.account.map((acc) => 'accounts[]=' + acc)
    }
    const openOrders = await Crypvestor.get('/v1/open-orders?page=' + req.query.page + '&' + account.join('&'))
    res.json(openOrders)
}

async function getCloseOrders(req, res, next) {
    let account = []
    if (typeof req.query.account !== 'undefined' && req.query.account !== 'false') {
        account = req.query.account.map((acc) => 'binance_account[]=' + acc)
    }
    const openOrders = await Crypvestor.get('/dashboard/closed-orders-client?page=' + req.query.page + '&' + account.join('&'))
    res.json(openOrders)
}

function getById(req, res, next) {
    userService
        .getById(req.params.id)
        .then((user) => res.json(user))
        .catch(next)
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        strategy: Joi.number().empty(''),
        type: Joi.string().empty(''),
        id: Joi.number().empty(''),
        password: Joi.string().min(6).empty(''),
        referral: Joi.string().empty('').allow('', null),
    })
    validateRequest(req, next, schema)
}

function update(req, res, next) {
    userService
        .update(req.user.id, req.body)
        .then((user) => res.json(user))
        .catch(next)
}

async function binanceApi(req, res, next) {
    const createBinanceApi = await Crypvestor.post('/v1/accounts', {
        public_key: await encrypt(req.body.key),
        secret_key: await encrypt(req.body.secret),
        name: req.user.firstName + ' ' + req.user.lastName,
        active: true,
        strategy_id: req.user.strategy,
        note: 'user ID=' + req.user.id,
    })
    if (typeof createBinanceApi.data !== 'undefined') {
        const user = await userService.update(req.user.id, {
            cryp_id: createBinanceApi?.data?.id,
            active: 1,
        })
        return res.json(user)
    }
    return res.json(createBinanceApi)
}

async function deactivate(req, res, next) {
    const update = await Crypvestor.post('/dashboard/update-account', {
        active: req.query.active === '0' ? false : true,
        binance_account_id: req.params.id,
        strategy_id: req.body.strategy,
    })
    if (typeof update !== 'undefined') {
        const user = await userService.update(req.body.id, {
            active: req.query.active,
        })
        return res.json(user)
    }
    return res.json(update)
}

function _delete(req, res, next) {
    userService
        .delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next)
}

router.post('/authenticate', authenticateSchema, authenticate)
router.post('/register', authorize(), registerSchema, register)
router.get('/', authorize(), getAll)
router.get('/current', authorize(), getCurrent)
router.get('/stats', authorize(), getStats)
router.get('/charts', authorize(), getCharts)
router.get('/pie', authorize(), getPie)
router.get('/accounts', authorize(), getAccounts)
router.get('/algos', authorize(), getAlgos)
router.get('/graph-balance', authorize(), getGraphBalance)
router.get('/balance/:id', authorize(), getBalance)
router.get('/statuses', authorize(), getStatuses)
router.get('/open-orders', authorize(), getOpenOrders)
router.get('/close-orders', authorize(), getCloseOrders)
router.get('/referrals', authorize(), getReferrals)
router.get('/:id', authorize(), getById)
router.put('/current', authorize(), updateSchema, update)
router.post('/api', authorize(), binanceApi)
router.delete('/:id', authorize(), _delete)
router.patch('/activate/:id', authorize(), deactivate)

module.exports = router
