import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx'
import toastMessage from '../../utils/toastMessage'

import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button'
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

import { bindActionCreators } from "redux";
import { actionCreators } from '../../Actions/index'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  inputs: {
    margin: "15px 0px",
  },
  signupInputs: {
    margin: "15px 0px",
  },
  btn: {
    border: "none",
    textTransform: "capitalize",
    fontWeight: 600,
    padding: "10px 20px",
  },
  para: {
    color: "#878787",
    fontSize: 12,
    fontWeight: 400,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonProgress: {
    color: "white",
    margin: "0 10px",
  }
}));

export default function Login() {

  const history = useHistory()

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const initial = useRef(true);

  useEffect(() => {
    if (initial.current === true) {
      initial.current = false;
    } else {
      let formError = false;
      const errorValues = Object.values(errors);
      errorValues.forEach((value) => {
        if (value) formError = true;
      });
      if (!formError) {
        setLoading(true);
        completeLogin();
      }
    }
  }, [submitCount]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { setUserInfo, setLoginPage, modalOpen, modalClose, setIsAuthenticate, setEmail, setAuthtoken } = bindActionCreators(actionCreators, dispatch)

  const { popupLogin } = useSelector((state) => state.userReducer);

  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    if (email === "") {
      return {
        isError: true,
        errorMsg: "Email can not be empty",
      };
    } else if (!regEmail.test(email)) {
      return {
        isError: true,
        errorMsg: "Please enter valid Email",
      };
    } else {
      return {
        isError: false,
        errorMsg: "",
      };
    }
  };

  const validatePassword = (pass) => {
    if (pass === "") {
      return {
        isError: true,
        errorMsg: `Password can not be empty`,
      };
    } else if (pass.length < 5) {
      return {
        isError: true,
        errorMsg: "Minimum 6 charterers required",
      };
    } else if (pass.length > 20) {
      return {
        isError: true,
        errorMsg: "Maximum 20 charterers allowed",
      };
    } else {
      return {
        isError: false,
        errorMsg: "",
      };
    }
  };

  const handleInputs = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const completeLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5500/api/auth/login", {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json, text/plain, */*"
        },
        body: JSON.stringify(values)
      });
      const result = await res.json();
      const data = await result.Data;
      setLoading(false)
      if (res.status != 302) {
        toastMessage(result.errors);
      } else {
        setUserInfo({ fName: data.fName, lName: data.lName, gender: data.gender, phone: data.phone, admin: Boolean(data.admin), orders: data.orders });
        setEmail(data.email)
        setIsAuthenticate(true)
        setAuthtoken(data.token)
        toastMessage("Login Successfull", "success")
        //Modal Close
        if (popupLogin) {
          modalClose();
        }
        if (data.admin) {
          history.replace('/admin')
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.message === "login/invalid-email-or-password") {
        toastMessage("Invalid Email or Password.", "info");
      } else {
        toastMessage("Something went wrong. Please login later.", "error");
      }
    }
  };

  const onLoginClick = () => {
    const validatedEmail = validateEmail(values.email);
    const validatedPassword = validatePassword(values.password);

    //Set Error
    setErrorMsg({
      email: validatedEmail.errorMsg,
      password: validatedPassword.errorMsg,
    });

    setErrors({
      email: validatedEmail.isError,
      password: validatedPassword.isError,
    });
    setSubmitCount((cnt) => cnt + 1);
    //checkout useEffect
  };

  return (
    <>
      <TextField
        error={errors.email}
        id={
          errors.email
            ? "standard-error-helper-text"
            : "standard-start-adornment"
        }
        label="Enter Email"
        className={`${classes.signupInputs} my-3`}
        onChange={handleInputs}
        value={values.email}
        name="email"
        helperText={errors.email && `${errorMsg.email}`}
      />
      <FormControl
        className={clsx(
          classes.margin,
          classes.textField,
          classes.signupInputs
        )}
        error={errors.password}
      >
        <InputLabel htmlFor="standard-adornment-password">
          Enter Password
        </InputLabel>
        <Input
          id={
            errors.password
              ? "standard-adornment-password"
              : "standard-start-adornment"
          }
          type={showPassword ? "text" : "password"}
          onChange={handleInputs}
          value={values.password}
          name="password"
          error={errors.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && (
          <FormHelperText id="standard-helper-text" error={true}>
            {errorMsg.password}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        variant="contained"
        className={`${classes.btn} my-5`}
        style={{ background: "#fb641b", color: "#fff" }}
        disabled={loading}
        onClick={onLoginClick}
      >
        {loading ? (
          <CircularProgress size={24} className={classes.buttonProgress} />
        ) : (
          "Login"
        )}
      </Button>
      <a
        className="signup_text"
        onClick={() => { setLoginPage(false); modalOpen() }}
      >
        New to Bestof Shopping? Create an account
      </a>
    </>
  );
}