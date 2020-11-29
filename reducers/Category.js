import { GET_CATEGORY } from '../actions/Category'
const INITIAL_STATE = {
};
const INITIAL_STATEA = []

const merge = (prev, next) => Object.assign({}, prev, next)

const categoryReducer = (state = INITIAL_STATEA, action) => {
// console.log(action.payload);

    switch (action.type) {
        case GET_CATEGORY:
            return state = action.payload
        default:
            return state
    }
}
export default categoryReducer