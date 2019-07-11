const router = require('express').Router()
const rp = require('request-promise')
const redis = require('../redis')
const spotify = require('../spotify')

// GET /api/me, retrieves user details from Spotify Web API
router.get('/', async (req, res, next) => {
    if (spotify.getAccessToken()) {
        const response = await spotify.getMe()

        const playlists = await rp.get(
            req.protocol + '://' + req.get('host') + '/api/me/playlists'
        )

        res.json({ user_details: response.body })
    } else {
        res.json({ user_details: undefined })
    }
})

// GET /api/me/playlists, retrieves metadata about user's playlists from Spotify Web API
router.get('/playlists', async (req, res, next) => {
    const playlists = redis.hgetallAsync('124')
    console.log(playlists)

    try {
        // Check if data on user's playlists is stored in Express session
        if (req.session.user_playlists) {
            res.json(req.session.user_playlists)
        } else {
            // Make a call to retrieve data and store it in session
            const response = await spotify.getUserPlaylists()
            res.json(response.body)
        }
    } catch (err) {
        res.json(err)
        next(err)
    }
})

router.post('/playlists', async (req, res, next) => {
    try {
    } catch (err) {}
})

module.exports = router
