import * as actionType from "../Action-Type/UserActionType";

const initialState = {
  isLoginPage: true,
  email: "",
  popupLogin: true,
  isModalOpen: false,
  isAuthenticate: false,
  user: {},
  authtoken: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_IS_LOGIN_PAGE:
      return { ...state, isLoginPage: action.payload };
    case actionType.SET_AUTHTOKEN:
      return { ...state, authtoken: action.payload };
    case actionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionType.SET_IS_AUTHENTICATE:
      return { ...state, isAuthenticate: action.payload };
    case actionType.SET_USER_INFO:
      return { ...state, user: action.payload };
    case actionType.SET_POPUP_LOGIN:
      return { ...state, popupLogin: action.payload };
    case actionType.UPDATE_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          fName: action.payload.fName,
          lName: action.payload.lName,
          gender: action.payload.gender,
          phone: action.payload.phone
        },
      };
    case actionType.UPDATE_USER_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      };
    case actionType.OPEN_MODAL:
      return { ...state, isModalOpen: true };

    case actionType.CLOSE_MODAL:
      return { ...state, isModalOpen: false };

    default:
      return state;
  }
};

export default userReducer;