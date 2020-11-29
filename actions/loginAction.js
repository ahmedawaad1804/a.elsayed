// action types

export const SET_LOGIN = 'SET_LOGIN'
export const SET_LOGOUT = 'SET_LOGOUT'




//action creator



export const setLogin = (data) => dispatch => {
   
        dispatch({
            type: 'SET_LOGIN',
            payload: data
        })
}

export const setLogout = () => dispatch => {
   
    dispatch({
        type: 'SET_LOGOUT',
    })
}