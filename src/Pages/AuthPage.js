import React, { useEffect, useState } from "react";
import Backdrop from '@mui/base/BackdropUnstyled'
import { CircularProgress } from "@mui/material";
import { makeStyles } from '@mui/styles'
import { setIsAuthenticate } from "../Actions/UserActions";
import Login from '../Components/auth/Login'
import Signup from '../Components/auth/Signup'
import { useSelector } from "react-redux";
import '../styles/AuthPage.css'
import ToastMessageContainer from '../Components/ToastMessageContainer'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));


function AuthPage({ popup = false }) {
  const [isOpen, setIsOpen] = useState(true);
  const { isLoginPage, isAuthenticate } = useSelector((state) => state.userReducer);
  const history = useHistory()
  const classes = useStyles();

  useEffect(() => {
    if (!isAuthenticate) {
      setIsAuthenticate(true)
      setIsOpen(false);
      history.push("/")
    }
  }, [isAuthenticate]);

  return (
    <div className={popup ? "login_popup" : "login"}>
      <div className="container_left">
        <div>
          <span className="title">
            {isLoginPage ? "Login" : "Looks like you're new here!"}
          </span>
          <p className="subtitle">
            {isLoginPage
              ? "Get access to your Orders, Wishlist and Recommendations"
              : "Sign up with your mobile number to get started"}
          </p>
        </div>
      </div>
      <div className="container_right">{isLoginPage ? <Login /> : <Signup />}</div>
      <Backdrop className={classes.backdrop} open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastMessageContainer />
    </div>
  );
}

export default AuthPage;