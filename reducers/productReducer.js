import { combineReducers } from 'redux';


import productsReducer from "./product"
import cartReducer from "./cart"
import bestsellerReducer from "./bestSeller"
import categoryReducer from "./Category"
import adressReducer from "./adressReducer"
import loginReducer from "./loginReducer"
import userReducer from "./userReducer"



const reducer = combineReducers({
    // lang :langReducer,
    productsReducer,
    cartReducer,
    bestsellerReducer,
    categoryReducer,
    adressReducer,
    loginReducer,
    userReducer
})

export default reducer