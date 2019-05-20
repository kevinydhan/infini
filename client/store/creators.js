import axios from 'axios'
import {
    AUTHENTICATE_USER,
    GET_USERS_PLAYLISTS,
    GET_USERS_TOP_TRACKS,
} from './types'

// Retrieves user details from server
export const authenticateUser = () => {
    return dispatch => {
        return axios.get('/me').then(res => {
            if (res.data.statusCode !== 401) {
                dispatch(getUserPlaylists())
                dispatch(getTopTracks())

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
                    type: GET_USERS_PLAYLISTS,
                    playlists: res.data,
                })
        })
    }
}

// Gets user's top tracks from server
const getTopTracks = () => {
    return dispatch => {
        return axios.get('/me/top-tracks').then(res => {
            if (res.data.statusCode !== 401)
                return dispatch({
                    type: GET_USERS_TOP_TRACKS,
                    tracks: res.data.items,
                    playlistTitle: 'Top Tracks',
                })
        })
    }
}
