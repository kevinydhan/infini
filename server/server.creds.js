const generateRandomString = require('./utils/generate-random-string')

module.exports = {
    stateKey: 'spotify_auth_state',

    scope: [
        'streaming', // Spotify Playback SDK scopes
        'user-read-email',
        'user-read-birthdate',
        'user-read-private',
        'user-read-recently-played', // React app scopes
        'user-top-read',
        'playlist-read-private',
        'playlist-modify-private'
    ].join(' '),

    sessionCreds: {
        saveUninitialized: false,
        resave: false,
        secret: generateRandomString(16)
    }
}
