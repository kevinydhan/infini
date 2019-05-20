module.exports = {
    market: ['US'],

    topTracks: {
        limit: 50,
    },

    // These are the settings for querying to recommendation API.
    recommendations: {
        limit: 100,

        acousticness: {
            min: false,
            max: false,
            target: true,
        },

        danceability: {
            min: false,
            max: false,
            target: true,
        },

        energy: {
            min: false,
            max: false,
            target: true,
        },

        tempo: {
            min: false,
            max: false,
            target: true,
        },

        instrumentalness: {
            min: false,
            max: false,
            target: true,
        },

        liveness: {
            min: false,
            max: false,
            target: true,
        },

        loudness: {
            min: false,
            max: false,
            target: true,
        },

        valance: {
            min: false,
            max: false,
            target: true,
        },
    },

    search: {},
}
