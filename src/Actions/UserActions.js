import * as actionType from "../Action-Type/UserActionType";

export function setLoginPage(isLoginPage) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_IS_LOGIN_PAGE,
      payload: isLoginPage
    })
  }
};

export function setEmail(email) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_EMAIL,
      payload: email
    })
  }
};

export function setIsAuthenticate(isAuthenticate) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_IS_AUTHENTICATE,
      payload: isAuthenticate
    })
  }
};

export function setUserInfo(user) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_USER_INFO,
      payload: user
    })
  }
};

export function setPopupLogin(isPopup) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_POPUP_LOGIN,
      payload: isPopup
    })
  }
};

export function updateUserInfo(fName, lName, gender, phone) {
  return (dispatch) => {
    dispatch({
      type: actionType.UPDATE_USER_INFO,
      payload: { fName, lName, gender, phone }
    })
  }
};

export function updateEmail(email) {
  return (dispatch) => {
    dispatch({
      type: actionType.UPDATE_USER_EMAIL,
      payload: email
    })
  }
};

export function modalOpen() {
  return (dispatch) => {
    dispatch({
      type: actionType.OPEN_MODAL,
      payload: {}
    })
  }
};

export function modalClose() {
  return (dispatch) => {
    dispatch({
      type: actionType.CLOSE_MODAL,
      payload: {}
    })
  }
};

export function setAuthtoken(authtoken) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_AUTHTOKEN,
      payload: authtoken
    })
  }
}