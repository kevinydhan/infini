const router = require('express').Router()
const spotify = require('../spotify')

router.get('/', async (req, res, next) => {
    if (spotify.getAccessToken()) {
        const response = await spotify.getMe()
        console.log(response.body)
        res.json({ userDetails: response.body })
    } else {
        res.json({ userDetails: undefined })
    }
})

router.get('/playlists', (req, res, next) => {})

module.exports = router
