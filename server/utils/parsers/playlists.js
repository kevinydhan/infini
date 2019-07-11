/**
 * Parses Spotify Web API's playlist data object.
 *
 * @param {Object} playlist - Playlist data, retrieved from Spotify Web API
 */

const parsePlaylist = playlist => {
    return {
        id: playlist.id,
        name: playlist.name,
        image_url: playlist.images[0].url
    }
}

module.exports = parsePlaylist
