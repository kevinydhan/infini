import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
    AUTHENTICATE_USER,
    GET_USERS_PLAYLISTS,
    GET_USERS_TOP_TRACKS,
} from './types'

const initialState = {
    userDetails: {}, // Data about logged in user
    playlists: [], // Array of Spotify playlist objects

    playlistTitle: '', // Used to label the SongMenu component
    tracks: [], // Array of Spotify track objects, can be either from top tracks or selected playlist
    recommendations: [], // Array of recommended songs based on selected playlist
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...state, userDetails: action.userDetails }

        case GET_USERS_PLAYLISTS:
            return { ...state, playlists: action.playlists }

        case GET_USERS_TOP_TRACKS:
            return {
                ...state,
                tracks: action.tracks,
                playlistTitle: action.playlistTitle,
            }

        default:
            return state
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
