const SpotifyWebApi = require('spotify-web-api-node')

const spotify = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

module.exports = spotify
