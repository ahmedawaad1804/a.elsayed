// action types

export const GET_CATEGORY = 'GET_CATEGORY'

//action creator


export const getCategory = () => dispatch => {

    dataService.getCategory3000().then(response => {

        dispatch({
            type: 'GET_CATEGORY',
            payload: response.data
        })

    }
    ).catch(err => {
        dispatch({
            type: 'GET_CATEGORY_FAILED',
        })

    })




}