const request = require('request')
const rp = require('request-promise')
const querystring = require('querystring')
const express = require('express')
const router = express.Router()

// Spotify utilities
const { createOptions } = require('../spotify')
const getSeedArtists = require('../misc/get-seed-artists')
const generateQueryParameters = require('../misc/generate-recommendation-query-parameters')

// This route is to retrieve a playlist's tracks from Spotify's API
router.post('/tracks', (req, res, next) => {
    const options = createOptions(req.body.trackApi)

    request.get(options, function(error, response, body) {
        res.json(body)
    })
})

// This route is to get recommendations based off of the submitted track id's.
router.post('/recommendations', async (req, res, next) => {
    try {
        // Generate seed artist query
        const seedArtists = getSeedArtists(req.body.artistIds).join(',')

        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/playlists/analyses',
            body: req.body,
            json: true,
        }

        // Retrieve music analyses for given tracks to be used for querying the recommendation API
        const analyzedTracks = await rp.post(options)

        // queryParameters is returned a JS object of Spotify query tags.
        const queryParameters = generateQueryParameters(
            analyzedTracks.audio_features
        )

        // res.json(queryParameters)
        // res.json(seedArtists) // seedArtists is working
    } catch (err) {
        res.status(400).json(err)
    }
})

// This route is to get song analyses for a set of track id's.
router.post('/analyses', (req, res, next) => {
    const ids = req.body.trackIds.join(',')

    const url =
        'https://api.spotify.com/v1/audio-features/?' +
        querystring.stringify({ ids })

    const options = createOptions(url)

    request.get(options, function(error, response, body) {
        res.json(body)
    })
})

module.exports = router
