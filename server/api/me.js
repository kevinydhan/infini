const router = require('express').Router()
const rp = require('request-promise')
const { spotify } = require('../spotify')
const parseData = require('../utils/parsers')

// GET /api/me, retrieves user details from Spotify Web API
router.get('/', async (req, res, next) => {
    if (spotify.getAccessToken()) {
        const response = await spotify.getMe()

        const playlists = await rp.get(
            req.protocol + '://' + req.get('host') + '/api/me/playlists'
        )

        res.json({
            user_details: response.body,
            playlists: JSON.parse(playlists)
        })
    } else {
        res.json({ user_details: undefined })
    }
})

// GET /api/me/playlists, retrieves metadata about user's playlists from Spotify Web API
router.get('/playlists', async (req, res, next) => {
    try {
        // Check if user's playlists are stored in Session
        if (req.session.user_playlists) {
            res.json(req.session.user_playlists)
        } else {
            // Make a call to retrieve data and store it in session
            const response = await spotify.getUserPlaylists()

            const playlists = response.body.items.map(playlist =>
                parseData.playlist(playlist)
            )

            req.session.user_playlists = playlists

            res.json(playlists)
        }
    } catch (err) {
        res.json(err)
        next(err)
    }
})

module.exports = router
