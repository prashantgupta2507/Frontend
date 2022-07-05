import * as actionType from "../Action-Type/cartActionType";

const initialState = {
  cartItems: [],
  stateChangeNotifyCounter: 1,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const item = action.payload.item;
      const existItem = state.cartItems.find(
        (product) => product.product_id === item.product_id
      );

      if (existItem) {
        return state;
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload.item],
        };
      }

    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.product_id !== action.payload.id
        ),
      };

    case actionType.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case actionType.UPDATE_QTY:
      let index = 0;
      state.cartItems.map((data, i) => {
        if (data.product_id === action.payload.productId) {
          index = i;
        }
      });
      state.cartItems[index].qty = action.payload.qty;
      return {
        ...state,
        cartItems: state.cartItems,
        stateChangeNotifyCounter: state.stateChangeNotifyCounter + 1,
      };

    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    default:
      return state;
  }
};

export default cartReducer;