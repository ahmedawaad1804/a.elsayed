// action types

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'




//action creator



export const setUser = (data) => dispatch => {
   
        dispatch({
            type: 'SET_USER',
            payload: data
        })
}

export const removeUser = () => dispatch => {
   
    dispatch({
        type: 'REMOVE_USER',
    })
}