import axios from 'axios'
import { Spotify } from '../modules'

const getTokens = () => {
    return axios.get('/tokens').then(res => {
        Spotify.setAccessToken(res.data.accessToken)
    })
}

export default getTokens
