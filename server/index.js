require('dotenv').config()

const cors = require('cors')
const errorHandler = require('./middleware/error-handler')
const express = require('express')
const crypvestor = require('./crypvestor')
const path = require('path')

const app = express()

crypvestor.login()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname + '/../build')))

app.use('/api/users', require('./controllers/users.controller'))

app.use(errorHandler)

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../build', 'index.html')))

app.listen(4000, () => console.log('Server is running... http://localhost:4000'))
