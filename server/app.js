const express = require('express')
const app = express()

app.use(express.static('public')).use(express.json())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

module.exports = app
