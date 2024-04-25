const initial_state = {
  carts: []
};

const CartReducer = (state = initial_state, action) => {
  if (action.type =="ADD-TO-CART") {
    return {
      ...state,
      carts: [...state.carts, action.payload] // 
    };
  } 
  else if (action.type == "DELETE-FROM-CART") {
    return {
      ...state,
      carts: state.carts.filter((item) => item.id !== action.payload.id)
    };
  }
  
  else {
    return state;
  }
};

export default CartReducer;
