const axios = require('axios')

let token = ''
let retries = 0

const login = async () => {
    try {
        const { data } = await axios.post(process.env.CRYP_API + '/login', {
            email: process.env.CRYP_EMAIL,
            password: process.env.CRYP_PASS,
        })
        token = data
    } catch (error) {
        console.log('Crypvestor API error ', error)
    }
}

const get = async (url) => {
    try {
        console.log('[CRYPVESTOR API] ', url)
        const { data } = await axios({
            method: 'get',
            url: process.env.CRYP_API + url,
            headers: {
                Authorization: 'bearer ' + token.token,
            },
        })
        return data
    } catch (error) {
        retries++
        await login()
        if (retries <= 5) {
            console.log('retries number=', retries)
            return await get(url)
        } else {
            return false
        }
    }
}

const post = async (url, toSend) => {
    try {
        console.log('[CRYPVESTOR API] ', url)
        console.log('[CRYPVESTOR API] ', toSend)
        const { data } = await axios({
            method: 'post',
            url: process.env.CRYP_API + url,
            headers: {
                Authorization: 'bearer ' + token.token,
            },
            data: toSend,
        })
        return data
    } catch (error) {
        retries++
        await login()
        //console.log('Crypvestor API error ', error.response)
        if (retries <= 5) {
            console.log('retries number=', retries)
            return await post(url, toSend)
        } else {
            return false
        }
    }
}

module.exports.login = login
module.exports.get = get
module.exports.post = post
module.exports.token = token
