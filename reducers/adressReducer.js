import {
    ADD_ADRESS,
    SET_ADRESS,
    SET_ADRESS_FAILED
} from '../actions/adressAction'
import adressService  from '../services/adressService'
 
const INITIAL_STATEA = []

const merge = (prev, next) => Object.assign({}, prev, next)


const adressReducer = (state = INITIAL_STATEA, action) => {

    switch (action.type) {
        case SET_ADRESS:
            state = action.payload
            // adressService.addAdress(state).then().catch(err=>console.log(err))
            // console.log(state);
            return state
        case ADD_ADRESS:
            state = [...state, action.payload]
            // adressService.addAdress(state).then().catch(err=>console.log(err))
            // console.log(state);
            return state
        default:
            return state
    }
}

export default adressReducer