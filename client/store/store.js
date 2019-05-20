import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AUTHENTICATE_USER, GET_USER_PLAYLISTS } from './types'

const initialState = {
    userDetails: {},
    playlists: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...state, userDetails: action.userDetails }

        case GET_USER_PLAYLISTS:
            return { ...state, playlists: action.playlists }

        default:
            return state
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
