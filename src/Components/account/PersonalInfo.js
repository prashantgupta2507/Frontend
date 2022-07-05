import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toastMessage from '../../utils/toastMessage';
import { makeCapitalizeText } from '../../utils/makeCapitalizeText'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Actions';

const useStyles = makeStyles((theme) => ({
    component: {
        padding: "30px 40px 0 40px",
    },
    form: {
        display: "flex",
        alignItems: "flex-start",
        margin: "20px 0",
    },
    saveBtn: {
        width: "150px",
        padding: "12px",
        color: "rgb(255, 255, 255)",
        borderRadius: "3px",
        fontSize: "16px",
        boxShadow: "none",
    },
    input: {
        width: "270px",
        fontSize: "14px",
        outline: "none",
        borderRadius: "2px",
        boxShadow: "none",
        marginRight: 10,
    },
    title: {
        fontSize: "18px",
        fontWeight: 600,
        paddingRight: "24px",
        display: "inline-block",
    },
    editLink: {
        display: "inline-block",
        fontSize: "14px",
        fontWeight: 500,
        color: "#2874f0",
        cursor: "pointer",
    },
}));


export default function PersonalInfo() {
    const [isEditPInfo, setIsEditPInfo] = useState(false);
    const [isEditPhone, setIsEditPhone] = useState(false);
    const { user, authtoken } = useSelector((state) => state.userReducer);

    const [values, setValues] = useState({
        fName: user.fName,
        lName: user.lName,
        gender: user.gender,
        phone: user.phone
    });

    const [errors, setErrors] = useState({
        fName: false,
        lName: false,
        phone: false,
    });

    const [errorMsg, setErrorMsg] = useState({
        fName: "",
        lName: "",
        phone: "",
    });

    //hooks
    const classes = useStyles();
    const initial = useRef(true);
    const dispatch = useDispatch();
    const { updateUserInfo } = bindActionCreators(actionCreators, dispatch)

    //Save Counter
    const [saveCountPInfo, setSaveCountPInfo] = useState(0);
    const [saveCountPhone, setSaveCountPhone] = useState(0);

    useEffect(() => {
        if (initial.current === false) {
            if (!errors.fName && !errors.lName) {
                axios.patch("http://localhost:5500/api/user/accounts/update-user-info", {
                    authtoken: authtoken,
                    fName: makeCapitalizeText(values.fName),
                    lName: makeCapitalizeText(values.lName),
                    gender: values.gender,
                }).then((res) => {
                    if (res.status === 200) {
                        updateUserInfo(
                            makeCapitalizeText(values.fName),
                            makeCapitalizeText(values.lName),
                            values.gender
                        )
                        toastMessage("Account details updated !", "success");
                    } else {
                        toastMessage("Please Correct your credentials", "error");
                    }
                }).catch((e) => {
                    toastMessage("Something went wrong.", "error");
                });
                setIsEditPInfo(false);
            }
        }
    }, [saveCountPInfo]);


    useEffect(() => {
        if (initial.current === true) {
            initial.current = false
        } else {
            if (!errors.phone) {
                axios.patch("http://localhost:5500/api/user/accounts/update-phone", {
                    authtoken: authtoken,
                    phone: values.phone,
                }).then((res) => {
                    if (res.status === 200) {
                        updateUserInfo(values.fName, values.lName, values.gender, values.phone)
                        toastMessage("Phone number updated !", "success");
                    } else {
                        toastMessage("Please Correct your credentials", "error");
                    }
                }).catch((e) => {
                    toastMessage("Something went wrong.", "error");
                });
                setIsEditPhone(false);
            }
        }
    }, [saveCountPhone]);

    //reg for name

    const regName = /^[a-zA-Z]+$/;
    const regPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

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

    const validatePhone = (phone) => {
        if (phone === "") {
            return {
                isError: true,
                errorMsg: `Phone number can not be empty`,
            };
        } else if (!regPhone.test(phone)) {
            return {
                isError: true,
                errorMsg: `Please enter valid phone`,
            };
        } else if (phone.length < 10) {
            return {
                isError: true,
                errorMsg: `Please enter 10 digit mobile number`
            }
        } else {
            return {
                isError: false,
                errorMsg: "",
            };
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const savePersonalInfo = () => {
        const validatedFName = validateName(values.fName, "First Name");
        const validatedLName = validateName(values.lName, "Last Name");

        //Set Error
        setErrorMsg({
            ...errorMsg,
            fName: validatedFName.errorMsg,
            lName: validatedLName.errorMsg,
        });

        setErrors({
            ...errors,
            fName: validatedFName.isError,
            lName: validatedLName.isError,
        });
        setSaveCountPInfo((cnt) => cnt + 1);
        //checkout useEffect
    };

    const savePhone = () => {
        const validatedPhone = validatePhone(values.phone);

        //Set Error
        setErrorMsg({
            ...errorMsg,
            phone: validatedPhone.errorMsg,
        });

        setErrors({
            ...errors,
            phone: validatedPhone.isError,
        });
        setSaveCountPhone((cnt) => cnt + 1);
        //checkout useEffect
    };

    return (
        <>
            <Box className={classes.component}>
                <Typography className={classes.title}>Personal Information</Typography>
                <span
                    className={classes.editLink}
                    onClick={() => setIsEditPInfo(!isEditPInfo)}
                >
                    {isEditPInfo ? "Cancel" : "Edit"}
                </span>
                <Box className={classes.form}>
                    <TextField
                        label={isEditPInfo ? "First Name" : ""}
                        placeholder="First Name"
                        variant="outlined"
                        className={classes.input}
                        value={values.fName}
                        name="fName"
                        disabled={!isEditPInfo}
                        onChange={handleChange}
                        error={errors.fName}
                        helperText={errors.fName && isEditPInfo && `${errorMsg.fName}`}
                    />
                    <TextField
                        label={isEditPInfo ? "Last Name" : ""}
                        placeholder="Last Name"
                        variant="outlined"
                        className={classes.input}
                        value={values.lName}
                        name="lName"
                        disabled={!isEditPInfo}
                        onChange={handleChange}
                        error={errors.lName}
                        helperText={errors.lName && isEditPInfo && `${errorMsg.lName}`}
                    />
                    {isEditPInfo && (
                        <Button
                            variant="contained"
                            className={classes.saveBtn}
                            style={{ background: "#2874f0" }}
                            onClick={savePersonalInfo}
                        >
                            SAVE
                        </Button>
                    )}
                </Box>
                <FormControl component="fieldset">
                    <Typography style={{ fontSize: 14 }}>Your Gender</Typography>
                    <RadioGroup
                        row
                        aria-label="gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="M"
                            control={<Radio style={{ color: "#2874f0" }} />}
                            label="Male"
                            disabled={!isEditPInfo}
                        />
                        <FormControlLabel
                            value="F"
                            control={<Radio style={{ color: "#2874f0" }} />}
                            label="Female"
                            disabled={!isEditPInfo}
                        />
                    </RadioGroup>
                </FormControl>
                <br />
                <Typography className={classes.title} style={{ marginTop: 10 }}>
                    Mobile Number
                </Typography>
                <span
                    className={classes.editLink}
                    onClick={() => setIsEditPhone(!isEditPhone)}
                >
                    {isEditPhone ? "Cancel" : "Edit"}
                </span>

                <Box className={classes.form}>
                    <TextField
                        label={isEditPhone ? "Phone Number" : ""}
                        variant="outlined"
                        className={classes.input}
                        name="phone"
                        value={values.phone}
                        disabled={!isEditPhone}
                        onChange={handleChange}
                        error={errors.phone}
                        helperText={errors.phone && isEditPhone && `${errorMsg.phone}`}
                    />
                    {isEditPhone && (
                        <Button
                            variant="contained"
                            className={classes.saveBtn}
                            style={{ background: "#2874f0" }}
                            onClick={savePhone}
                        >
                            SAVE
                        </Button>
                    )}
                </Box>
                <Box>
                    <div style={{ margin: "50px 0", fontFamily: 'sans-serif' }}>
                        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
                            FAQs
                        </div>
                        <div>
                            <h4>
                                What happens when I update my email address (or mobile number)?
                            </h4>
                            <p>
                                Your login email id (or mobile number) changes, likewise. You'll
                                receive all your account related communication on your updated
                                email address (or mobile number).
                            </p>
                            <br />
                            <h4>
                                When will my BestOf Shopping account be updated with the new email
                                address (or mobile number)?
                            </h4>
                            <p>
                                It happens as soon as you confirm the verification code sent to
                                your email (or mobile) and save the changes.
                            </p>
                            <br />
                            <h4>
                                What happens to my existing BestOf Shopping account when I update my
                                email address (or mobile number)?
                            </h4>
                            <p>
                                Updating your email address (or mobile number) doesn't
                                invalidate your account. Your account remains fully functional.
                                You'll continue seeing your Order history, saved information and
                                personal details.
                            </p>
                        </div>
                    </div>
                </Box>
            </Box>
        </>
    );
}