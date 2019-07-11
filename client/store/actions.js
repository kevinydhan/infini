import axios from 'axios'

// Action types
export const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS'

/**
 * Retrieves user details and user's playlists from GET `/api/me`. If successful, user's playlists will be added to Redux store.
 */
export const getMe = () => {
    return dispatch => {
        return axios.get('/api/me').then(res => {
            dispatch({
                type: GET_USER_PLAYLISTS,
                playlists: res.data.playlists
            })
            return res.data.user_details
        })
    }
}
