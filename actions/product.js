// action types

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const FIRST_GET_PRODUCTS = 'FIRST_GET_PRODUCTS'
export const INCREASE_CART_ITEMS = 'INCREASE_CART_ITEMS'
export const GET_CART = 'GET_CART'
export const SET_CART = 'SET_CART'
export const FREE = 'FREE'



/* services */
import dataService from '../services/dataService'
//action creator


export const refreshtProducts = () => dispatch => {
    
    dataService.getProducts().then(response => {
        dispatch({
            type: 'GET_PRODUCTS',
            payload: response.data.products
        })

    }
    ).catch(err => {
        dispatch({
            type: 'GET_PRODUCTS_FAILED',
            
        })

    })




}
export const firstGetProducts = (data) => dispatch => {
   
        dispatch({
            type: 'FIRST_GET_PRODUCTS',
            payload: data
        })
}

export const setCart = (data) => dispatch => {
    console.log("--------add------------------------");
    
    dispatch({
        type: 'INCREASE_CART_ITEMS',
        payload: data
    })
}

export const setCartModifications = (data) => dispatch => {
   
   
    dispatch({
        type: 'SET_CART',
        payload: data
    })
}



export function getCart() {
    return {
        type: 'GET_CART',
    }
}



export const freeCart = () => dispatch => {
   
   console.log("-fre---------------------------------");
   
    dispatch({
        type: 'FREE',
    })
}