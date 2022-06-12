const crypto = require('crypto')

const cryptkey = process.env.ENCRYPT

async function encrypt(text) {
    try {
        var cipher = crypto.createCipheriv('aes-128-ecb', cryptkey, null)
        var crypted = cipher.update(text, 'utf8', 'base64') //base64 , hex
        crypted += cipher.final('base64')
        return crypted
    } catch (err) {
        console.error('encrypt error', err)
        return null
    }
}

async function decrypt(encryptdata) {
    //Check all Algorithms
    console.log(crypto.getCiphers()) // ['aes-128-cbc', 'aes-128-ccm', ...]

    try {
        let decipher = crypto.createDecipheriv('aes-128-cbc', cryptkey, null)
        decipher.setAutoPadding(false)
        let decoded = decipher.update(encryptdata, 'base64', 'utf8') //base64 , hex
        decoded += decipher.final('utf8')
        return decoded
    } catch (err) {
        console.error('decrypt error', err)
        return null
    }
}

const AesService = {
    encrypt: encrypt,
    decrypt: decrypt,
}
module.exports = AesService
