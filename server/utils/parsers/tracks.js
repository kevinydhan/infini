/**
 * Parses Spotify Web API's track data object.
 *
 * @param {Object} track - Track data, retrieved from Spotify Web API
 */

const parseTrack = track => {
    const { album, artists } = track

    return {
        id: track.id,
        name: track.name,
        external_url: track.external_urls.spotify,
        album: {
            id: album.id,
            name: album.name,
            image_url: album.images[0].url
        },
        artists: artists.map(artist => ({
            id: artist.id,
            name: artist.name,
            external_url: artist.external_urls.spotify
        }))
    }
}

module.exports = parseTrack
