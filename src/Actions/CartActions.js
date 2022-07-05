import * as actionType from "../Action-Type/cartActionType";

export const addToCart = (item) => async (dispatch) => {
  dispatch({
    type: actionType.ADD_TO_CART,
    payload: { item }
  });
};

export const removeFromCart = (id) => async (dispatch) => {
  dispatch({
    type: actionType.REMOVE_FROM_CART,
    payload: { id: id }
  });
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: actionType.CLEAR_CART,
    payload: {},
  });
};

export const getCartItems = () => async (dispatch, getState) => {
  const { cartItems } = getState().cartReducer;

  dispatch({
    type: actionType.SET_CART_ITEMS,
    payload: {
      cartItems: cartItems,
    },
  });
};

export function updateQty(productId, qty) {
  return (dispatch) => {
    dispatch({
      type: actionType.UPDATE_QTY,
      payload: { productId, qty }
    })
  }
};