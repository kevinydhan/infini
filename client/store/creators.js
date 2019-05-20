import axios from 'axios'
import { AUTHENTICATE_USER, GET_USER_PLAYLISTS } from './types'

// Retrieves user details from server
export const authenticateUser = () => {
    return dispatch => {
        return axios.get('/me').then(res => {
            if (res.data.statusCode !== 401) {
                dispatch(getUserPlaylists())

                return dispatch({
                    type: AUTHENTICATE_USER,
                    userDetails: res.data,
                })
            }
        })
    }
}

// Retrieves user's playlists from server
const getUserPlaylists = () => {
    return dispatch => {
        return axios.get('/me/playlists').then(res => {
            if (res.data.statusCode !== 401)
                return dispatch({
                    type: GET_USER_PLAYLISTS,
                    playlists: res.data,
                })
        })
    }
}
