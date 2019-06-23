import Spotify from '../index'

/**
 * Creates headers for requests to Spotify API. Returns a JS object.
 */

const createOptions = () => ({
    headers: {
        Authorization: 'Bearer ' + Spotify.getAccessToken()
    },
    json: true
})

export default createOptions
