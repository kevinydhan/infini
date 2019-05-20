import axios from 'axios'
import store from './store'
import {
    AUTHENTICATE_USER,
    GET_USERS_PLAYLISTS,
    UPDATE_PLAYLIST_TRACKS,
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
                    type: UPDATE_PLAYLIST_TRACKS,
                    tracks: res.data.items,
                    playlistTitle: 'Top Tracks',
                })
        })
    }
}

// Gets tracks for selected playlist from server
export const getPlaylistsTracks = (trackApi, playlistTitle) => {
    return dispatch => {
        return axios.post('/playlists/tracks', { trackApi }).then(res => {
            if (res.data.statusCode !== 401)
                return dispatch({
                    type: UPDATE_PLAYLIST_TRACKS,
                    tracks: res.data.items
                        .filter(e => e.track.id) // This is used to filter out any local files
                        .map(e => e.track),
                    playlistTitle: playlistTitle,
                })
        })
    }
}

// Gets recommendations either based off of selected playlist of last loaded recommendations
export const getRecommendations = () => {
    // Unfortunately, I couldn't get the sync button on the NavBar component to do this logic.
    const { tracks, recommendations } = store.getState()

    // If there are recommendations, use the recommended tracks to reseed Spotify's recommendation query.
    const selected = recommendations.length ? recommendations : tracks

    // Lighten the form data. To use Spotify's query, the track's id is the only info we need.
    const trackIds = selected.map(e => e.id)

    // I will need to change this to a recursive array flattener... later.
    // First .map() is retrieving all of the artist arrays.
    // Second .map() is retrieving the artist's id.
    const artistIds = [].concat(...selected.map(e => e.artists)).map(e => e.id)

    return dispatch => {
        return axios
            .post('/playlists/recommendations', { trackIds, artistIds })
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data))
    }
}
