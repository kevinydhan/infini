const express = require('express')
const { spotify } = require('../spotify')
const spotifyConfig = require('../spotify.config')
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

router.get('/top-tracks', (req, res, next) => {
    spotify
        .getMyTopTracks({ limit: spotifyConfig.topTracks.limit })
        .then(response => {
            res.json(response.body)
        })
        .catch(error => {
            console.error(error)
            res.status(error.statusCode).json(error)
        })
})

module.exports = router
