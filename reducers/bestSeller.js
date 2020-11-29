import { GET_BESTSELLER } from '../actions/bestSeller'
const INITIAL_STATE = {
};
const INITIAL_STATEA = []

const merge = (prev, next) => Object.assign({}, prev, next)

const bestsellerReducer = (state = INITIAL_STATEA, action) => {

    switch (action.type) {
        case GET_BESTSELLER:
            return state = action.payload
        default:
            return state
    }
}
export default bestsellerReducer