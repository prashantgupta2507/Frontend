import * as actionType from "../Action-Type/orderActionType";
import axios from "axios";

export const setOrderItems = (cartItems) => {
    let orderItems = [];
    if (cartItems) {
        cartItems.map((item) => {
            orderItems.push({
                productId: item.product_id,
                qty: item.qty,
                price: item.price
            });
        });
    }
    return (dispatch) => {
        dispatch({
            type: actionType.SET_ORDER_ITEMS,
            payload: {
                orderItems,
            }
        })
    }
};

export const getOrderDetails = () => async (dispatch, getState) => {
    const { isAuthenticate, authtoken } = getState().userReducer;
    if (isAuthenticate) {
        try {
            const { data } = await axios.post("http://localhost:5500/api/order/orders/get-order-details", { authtoken });
            console.table(data)
            dispatch({
                type: actionType.GET_ORDER_DETAILS,
                payload: {
                    details: data,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export const setTotalAmount = (totalAmount) => {
    return (dispatch) => {
        dispatch({
            type: actionType.SET_TOTAL_AMOUNT,
            payload: {
                price: totalAmount,
            }
        })
    };
};