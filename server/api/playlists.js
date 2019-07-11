const router = require('express').Router()
const rp = require('request-promise')
const redis = require('../redis')
const { spotify, createOptions } = require('../spotify')
const parseData = require('../utils/parsers')

// POST /api/playlists/:playlistId/tracks, retrieves all tracks for specified track API url
router.get('/:playlistId/tracks', async (req, res, next) => {
    const { playlistId } = req.params
    const tracks_api =
        'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks'

    try {
        const response = await rp.get(createOptions(tracks_api))

        const tracks = response.items.map(trackData =>
            parseData.track(trackData.track)
        )

        res.json(response.items)
    } catch (err) {
        next(err)
    }
})

module.exports = router
