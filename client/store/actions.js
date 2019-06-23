import axios from 'axios'
import { Spotify } from '../modules'
import createOptions from '../modules/spotify/utils/create-options'

export const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS'
export const GET_PLAYLISTS_TRACKS = 'GET_PLAYLISTS_TRACKS'

// ---------------------------------------------------------------------------

/**
 * Uses Spotify Web API to retrieve current user's playlists and mount it to Redux store. Returns a promise.
 */

export const getUserPlaylists = () => {
    return dispatch => {
        return Spotify.getUserPlaylists().then(res =>
            dispatch({ type: GET_USER_PLAYLISTS, playlists: res.items })
        )
    }
}

// ---------------------------------------------------------------------------

/**
 * Sends a request to Spotify API to retrieve tracks for selected playlist. Returns a promise.
 *
 * @param {string} trackApi - Url to Spotify API endpoint to retrieve playlist's tracks
 * @param {string} playlistTitle - Title of playlist
 */

export const getPlaylistsTracks = (trackApi, playlistTitle) => {
    return dispatch => {
        return axios
            .get(trackApi, createOptions())
            .then(res =>
                dispatch({
                    type: GET_PLAYLISTS_TRACKS,
                    tracks: res.data.items
                        .filter(e => e.track.id)
                        .map(e => e.track),
                    playlistTitle
                })
            )

            .catch(err => console.log(err))
    }
}
