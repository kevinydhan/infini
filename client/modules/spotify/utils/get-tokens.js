import axios from 'axios'
import Spotify from '../index'

/**
 * Fetches Spotify access token and refresh token from host API's GET `/tokens`. Returns a promise.
 *
 * @return {Promise} - If successful, `response.data` is `{ accessToken: 'your_access_token', refreshToken: 'your_refresh_token' }`. If there is no token, the values for `accessToken` and `refreshToken` are set as `undefined`.
 */

const getTokens = () => {
    return axios.get('/tokens').then(res => {
        Spotify.setAccessToken(res.data.accessToken)
    })
}

export default getTokens
