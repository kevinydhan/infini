const rp = require('request-promise')
const express = require('express')
const { spotify } = require('../spotify')

const router = express.Router()

router.get('/', (req, res, next) => {
    spotify
        .getMe()
        .then(response => res.json(response.body))
        .catch(error => {
            console.error(error)
            res.status(error.statusCode).json(error)
        })
})

router.get('/playlists', (req, res, next) => {
    spotify
        .getUserPlaylists()
        .then(response => res.json(response.body.items))
        .catch(error => {
            console.error(error)
            res.status(error.statusCode).json(error)
        })
})

module.exports = router
