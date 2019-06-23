import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { GET_USER_PLAYLISTS, GET_PLAYLISTS_TRACKS } from './actions'

const initialState = {
    playlists: [],
    tracks: [],
    playlistTitle: 'No playlist selected'
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PLAYLISTS:
            return { ...state, playlists: action.playlists }

        case GET_PLAYLISTS_TRACKS:
            return {
                ...state,
                tracks: action.tracks,
                playlistTitle: action.playlistTitle
            }

        default:
            return state
    }
}

const logger = createLogger({ collapsed: true })

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
