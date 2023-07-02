import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import clsx from 'clsx'

import { actionCreators } from '../../Actions/index'
import toastMessage from '../../utils/toastMessage'
import { makeCapitalizeText } from "../../utils/makeCapitalizeText";
import ReCAPTCHA from 'react-google-recaptcha'

const useStyles = makeStyles((theme) => ({
    signupInputs: {
        margin: "5px 0px 20px 0",
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
        marginTop: 10,
        marginBottom: 10,
    },
    buttonProgress: {
        color: "white",
        margin: "0px 10px",
    },
}));

export default function Signup() {

    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [reCaptchaValue, setReCaptchaValue] = useState(null);

    const [values, setValues] = useState({
        fName: "",
        lName: "",
        password: "",
        email: "",
        otp: ""
    });
    const [errors, setErrors] = useState({
        fName: false,
        lName: false,
        password: false,
        email: false
    });

    const [errorMsg, setErrorMsg] = useState({
        fName: "",
        lName: "",
        password: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);
    const initial = useRef(true);
    const { popupLogin } = useSelector((state) => state.userReducer);

    const regName = /^[a-zA-Z]+$/;
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/;
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
                completeSignup();
            }
        }
    }, [submitCount]);

    const classes = useStyles();
    const dispatch = useDispatch();
    const { setIsAuthenticate, setUserInfo, modalClose, setAuthtoken, setEmail, setLoginPage } = bindActionCreators(actionCreators, dispatch)

    const handleClickShowPassword = (value) => {

        setShowPassword(!showPassword);
    };

    const validateName = (name, fieldName) => {
        if (name === "") {
            return {
                isError: true,
                errorMsg: `${fieldName} can not be empty`,
            };
        } else if (name.length < 3) {
            return {
                isError: true,
                errorMsg: "Minimum 3 charterers required",
            };
        } else if (name.length > 20) {
            return {
                isError: true,
                errorMsg: "Maximum 20 charterers allowed",
            };
        } else if (!regName.test(name)) {
            return {
                isError: true,
                errorMsg: `Invalid ${fieldName}`,
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
        } else if (pass.length < 6) {
            return {
                isError: true,
                errorMsg: "Minimum 6 charterers required",
            };
        } else if (pass.length > 20) {
            return {
                isError: true,
                errorMsg: "Maximum 20 charterers allowed",
            };
        } else if (!regPassword.test(pass)) {
            return {
                isError: true,
                errorMsg: "Week Password !",
            };
        } else {
            return {
                isError: false,
                errorMsg: "",
            };
        }
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

    const generateOtp = async () => {
        const res = await fetch(`http://localhost:5500/api/otp/generate`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json, text/plain, */*"
            },
            body: JSON.stringify({
                email: values.email,
                fName: values.fName,
                lName: values.lName,
                reCaptchaValue
            })
        })

        const result = await res.json();
        if (res.status === 400) {
            toastMessage(result.msg, "info")
        } else if (res.status === 200) {
            toastMessage("OTP Sent Successfully to your email", "success")
            setShowOTP(true)
        } else {
            toastMessage(result.err, "error")
        }
    }

    const completeSignup = async () => {
        if (showOTP === false) {
            generateOtp()
        } else {
            setLoading(true);
            let admin = false;
            if (values.email === 'chayangupta7@gmail.com') {
                admin = true;
            }
            try {
                const res = await fetch("http://localhost:5500/api/otp/verify", {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Accept": "application/json, text/plain, */*"
                    },
                    body: JSON.stringify({
                        email: values.email,
                        fName: makeCapitalizeText(values.fName),
                        lName: makeCapitalizeText(values.lName),
                        password: values.password,
                        admin: admin,
                        userOtp: values.otp
                    })
                });
                setLoading(false);
                let result = await res.json()
                if (res.status === 201) {
                    setIsAuthenticate(true);
                    setEmail(result.Data.email);
                    setUserInfo({ fName: makeCapitalizeText(result.Data.fName), lName: makeCapitalizeText(result.Data.lName), gender: null, phone: null, admin: Boolean(result.Data.admin), orders: [] })
                    setAuthtoken(result.Data.token)
                    toastMessage("Registration Successfull", "success")

                    //Modal Close
                    if (popupLogin)
                        modalClose();
                    if (result.Data.admin) {
                        history.replace('/admin')
                    }
                } else if (res.status === 400) {
                    toastMessage(result.msg, "info");
                } else {
                    toastMessage(result.err, "error")
                }

            } catch (error) {
                setLoading(false);
                toastMessage("Something went wrong. Please sign up later.", "error");
            }
        }

    };

    const handleInputs = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const submitForm = () => {
        const validatedFName = validateName(values.fName, "First Name");
        const validatedLName = validateName(values.lName, "Last Name");
        const validatedEmail = validateEmail(values.email);
        const validatedPassword = validatePassword(values.password);

        //Set Error
        setErrorMsg({
            fName: validatedFName.errorMsg,
            lName: validatedLName.errorMsg,
            password: validatedPassword.errorMsg,
            email: validatedEmail.errorMsg
        });

        setErrors({
            fName: validatedFName.isError,
            lName: validatedLName.isError,
            password: validatedPassword.isError,
            email: validatedEmail.isError
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
                className={`${classes.signupInputs} my-1`}
                onChange={handleInputs}
                value={values.email}
                name="email"
                helperText={errors.email && `${errorMsg.email}`}
            />
            <TextField
                id={errors.fName ? "standard-basic" : "standard-start-adornment"}
                label="Enter First Name"
                className={`${classes.signupInputs} 'my-1'`}
                value={values.fName}
                onChange={handleInputs}
                name="fName"
                error={errors.fName}
                helperText={errors.fName && `${errorMsg.fName}`}
            />
            <TextField
                id={errors.lName ? "standard-basic" : "standard-start-adornment"}
                label="Enter Last Name"
                className={`${classes.signupInputs} my-1`}
                value={values.lName}
                onChange={handleInputs}
                name="lName"
                error={errors.lName}
                helperText={errors.lName && `${errorMsg.lName}`}
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
                    Set Password
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
                    className="my-3"
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
            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} onChange={setReCaptchaValue} />
            {showOTP ?
                <>
                    <TextField
                        id={errors.otp ? "standard-basic" : "standard-start-adornment"}
                        label="Enter OTP"
                        className={`${classes.signupInputs} my-1`}
                        value={values.otp}
                        onChange={handleInputs}
                        name="otp"
                        error={errors.otp}
                        helperText={errors.otp && `${errorMsg.otp}`}
                    />
                    <p className={classes.para} style={{ color: 'deepskyblue', textDecoration: 'underline', fontSize: '1rem', cursor: 'pointer' }} onClick={generateOtp}>
                        Resend Otp
                    </p>
                </> : null}

            <p className={classes.para}>
                By continuing, you agree to Bestof Shopping Terms of Use and Privacy Policy.
            </p>
            <Button
                variant="contained"
                className={`${classes.btn} my-1`}
                style={{ background: "#fb641b", color: "#fff" }}
                disabled={loading}
                onClick={submitForm}
            >
                {loading ? (
                    <CircularProgress size={24} className={classes.buttonProgress} />
                ) : (
                    showOTP ? "Signup" : "Send OTP"
                )}
            </Button>
            <Button
                variant="contained"
                className={classes.btn}
                style={{
                    background: "#fff",
                    color: "#2874f0",
                    marginTop: "20px",
                }}
                onClick={() => {
                    setLoginPage(true)
                }}
            >
                Existing User? Log in
            </Button>
        </>
    )
}
