import { combineReducers } from 'redux';
import {
    UPDATE_LANGUAGE, FREE, GET_TEST, GET_PRODUCTS, FIRST_GET_PRODUCTS, INCREASE_CART_ITEMS,SET_CART,
    GET_CART
} from '../actions/product'
const INITIAL_STATE = {
};
const INITIAL_STATEA = []

const merge = (prev, next) => Object.assign({}, prev, next)

import cartReducer from "./cart"
const productsReducer = (state = INITIAL_STATEA, action) => {

    switch (action.type) {
        case GET_PRODUCTS:
            return state = action.payload
        case FIRST_GET_PRODUCTS:
            return state = action.payload
        default:
            return state
    }
}
export default productsReducer