import {
    SET_LOGIN,
    SET_LOGOUT

} from '../actions/loginAction'

const INITIAL_STATE = null

const merge = (prev, next) => Object.assign({}, prev, next)


const loginReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_LOGIN:
            state = action.payload
            return state
        case SET_LOGOUT:
            state = INITIAL_STATE
            return state
        default:
            return state
    }
}

export default loginReducer