import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { GET_USER_PLAYLISTS } from './actions'

const initialState = {
    playlists: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PLAYLISTS:
            return { ...state, playlists: action.playlists }

        default:
            return state
    }
}

const logger = createLogger({ collapsed: true })

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
