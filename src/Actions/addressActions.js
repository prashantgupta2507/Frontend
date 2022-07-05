import axios from "axios";
import * as actionType from "../Action-Type/addressActionType";

export function updateAddrComState(newState) {
    return (dispatch) => {
        dispatch({
            type: actionType.UPDATE_ADDRESS_COMPONENT_STATE,
            payload: {
                newState,
            }
        })
    }
};

export function addNewAddress(address) {
    return (dispatch) => {
        dispatch({
            type: actionType.ADD_NEW_ADDRESS,
            payload: {
                address,
            }
        })
    }
};

export const getAddresses = () => async (dispatch, getState) => {
    const { isAuthenticate, authtoken } = getState().userReducer;
    if (isAuthenticate) {
        try {
            const { data } = await axios.post('http://localhost:5500/api/user/address/get-addresses', { authtoken });
            dispatch({
                type: actionType.SET_ADDRESSES,
                payload: {
                    addresses: data,
                },
            });
        } catch (error) {
            console.log(error)
        }
    }
};

export const deleteAddress = (id) => async (dispatch, getState) => {
    const { authtoken } = getState().userReducer;
    try {
        await axios.post("http://localhost:5500/api/user/address/delete-address", { id, authtoken })
    } catch (error) {
        console.log(error)
    }
    dispatch({
        type: actionType.REMOVE_ADDRESS,
        payload: {
            addressId: id,
        },
    });
};