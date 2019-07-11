const SpotifyWebApi = require('spotify-web-api-node')

// Create new Spotify Web API client
const spotify = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

/**
 * Creates authorization headers for Spotify Web API.
 *
 * @param {string} url - Spotify Web API endpoint
 */

const createOptions = url => ({
    headers: { Authorization: 'Bearer ' + spotify.getAccessToken() },
    url: url,
    json: true
})

module.exports = { spotify, createOptions }
