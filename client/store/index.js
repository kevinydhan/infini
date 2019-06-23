import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { GET_TOKENS } from './actions'

const initialState = {
    accessToken: '',
    refeshToken: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOKENS:
            return {
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }

        default:
            return state
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
