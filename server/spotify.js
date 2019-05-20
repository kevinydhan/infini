const SpotifyWebApi = require('spotify-web-api-node')
const spotify = new SpotifyWebApi(require('./credentials'))

const createOptions = url => ({
    url: url,
    headers: {
        Authorization: 'Bearer ' + spotify.getAccessToken(),
    },
    json: true,
})

module.exports = {
    spotify,
    createOptions,
}
