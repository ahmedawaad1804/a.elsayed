// action types

export const ADD_ADRESS = 'ADD_ADRESS'
export const SET_ADRESS = 'SET_ADRESS'
export const SET_ADRESS_FAILED = 'SET_ADRESS_FAILED'




/* services */
import dataService from '../services/dataService'
//action creator


export const getAdress = (data) => dispatch => {
    
  
        dispatch({
            type: 'SET_ADRESS',
            payload: data
        })

  




}
export const addAdress = (data) => dispatch => {
//    console.log(data);
        dispatch({
            type: 'ADD_ADRESS',
            payload: data
        })
}
