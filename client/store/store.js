import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import thunk from 'redux-thunk'
import {
    AUTHENTICATE_USER,
    GET_USERS_PLAYLISTS,
    UPDATE_PLAYLIST_TRACKS,
    UPDATE_RECOMMENDATIONS,
} from './actions'

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

        case UPDATE_PLAYLIST_TRACKS: // This is used to render the left SongMenu.
            return {
                ...state,
                tracks: action.tracks,
                playlistTitle: action.playlistTitle,
                recommendations: action.recommendations,
            }

        case UPDATE_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: action.recommendations,
            }

        default:
            return state
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
