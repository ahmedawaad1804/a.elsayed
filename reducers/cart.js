import {
  UPDATE_LANGUAGE,
  FREE,
  GET_TEST,
  GET_PRODUCTS,
  FIRST_GET_PRODUCTS,
  INCREASE_CART_ITEMS,
  SET_CART,
  GET_CART,
} from "../actions/product";
const INITIAL_STATEA = [];

const merge = (prev, next) => Object.assign({}, prev, next);

const cartReducer = (state = INITIAL_STATEA, action) => {
  console.log("___________________________");
  console.log(action);
  
  if (action.type == INCREASE_CART_ITEMS && action.payload.count != 0) {
    let newState = [...state];
    let temp = action.payload;
    // console.log(state.find(obj => obj.item._id === action.payload.item._id));
    // console.log('new state before',newState, action.payload.item.extraArray);
    // console.log(JSON.stringify(action.payload.item.extraArray));
    // console.log(JSON.stringify(["1"]) === JSON.stringify(["1",]));
    // console.log(state.foreach(obj => {if(obj.item._id === action.payload.item._id &&  JSON.stringify(obj.item.extraArray) === JSON.stringify(action.payload.item.extraArray)  ) {return true}}));

    console.log("----------------stste-------------------");
    console.log(state);
    // );
    // for (let index = 0; index < state.length; index++) {
    //     const obj = state[index];
    //     if(obj.item._id === action.payload.item._id &&  JSON.stringify(obj.item.extraArray) === JSON.stringify(action.payload.item.extraArray) )
    //     {
    //         console.log(obj.item.extraArray);
    //         console.log(action.payload.item.extraArray);
    //         console.log(JSON.stringify(obj.item.extraArray) ==JSON.stringify(action.payload.item.extraArray));
    //         console.log(true);
    //     }
    // }

    if (
      newState.find(
        (obj) =>
          obj.item._id === action.payload.item._id &&
          JSON.stringify(obj.item.extraArray) ===
            JSON.stringify(action.payload.item.extraArray)
      ) != undefined
    ) {
      temp = {
        item: action.payload.item,
        prodNontes:action.payload.prodNontes?action.payload.prodNontes:" ",
        count:
          action.payload.count +
          newState.find(
            (obj) =>
              obj.item._id === action.payload.item._id &&
              JSON.stringify(obj.item.extraArray) ===
                JSON.stringify(action.payload.item.extraArray)
          ).count,
      };
      // console.log(state.findIndex(obj => obj.item._id === action.payload.item._id));
      newState.splice(
        newState.findIndex(
          (obj) =>
            obj.item._id === action.payload.item._id &&
            JSON.stringify(obj.item.extraArray) ===
              JSON.stringify(action.payload.item.extraArray)
        ),
        1,
        temp
      );
    } else {
      temp.prodNontes=action.payload.prodNontes?action.payload.prodNontes:" ",
      newState = [...newState, temp];
    }
    console.log("----------------new state-------------------");
    console.log(newState)

    return newState;
  } else if (action.type == FREE) {
    return INITIAL_STATEA;
  } else if (action.type == GET_CART) {
    return state;
  } else if (action.type == SET_CART) {
    state = action.payload;
    // console.log(state);

    return state;
  } else return state;
};

export default cartReducer;
