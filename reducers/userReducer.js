import {
    SET_USER,
    REMOVE_USER

} from '../actions/userAction'

const INITIAL_STATE = null

const merge = (prev, next) => Object.assign({}, prev, next)


const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_USER:
            state = action.payload
            return state
        case REMOVE_USER:
            state = INITIAL_STATE
            return state
        default:
            return state
    }
}

export default userReducer