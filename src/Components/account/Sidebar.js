import React from 'react'
import { bindActionCreators } from 'redux';
import { actionCreators, cartActionCreators } from '../../Actions';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { Person, ChevronRight, PowerSettingsNew } from '@mui/icons-material';

import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

import { maleAvatarUrl } from '../../constants/data'
import OrderIcon from '../../Images/order-icon.png'

const useStyles = makeStyles((theme) => ({
    component: {
        marginTop: 55,
        padding: "30px 135px",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            padding: "15px 0",
        },
    },
    profileWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    leftComponent: {
        // width: '67%',
        paddingRight: 15,
        [theme.breakpoints.down("sm")]: {
            marginBottom: 15,
        },
    },
    header: {
        padding: "10px 24px",
        paddingLeft: 15,
        marginBottom: 15,
        background: "#fff",
        boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    },
    bottom: {
        minHeight: "400px",
        padding: "16px 22px",
        background: "#fff",
        borderTop: "1px solid #f0f0f0",
    },
    large: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
    },
    smallText: {
        fontSize: 12,
        opacity: 0.8,
    },
    boldText: {
        color: "#2C3E50",
        fontSize: 16,
        fontWeight: 600,
    },
    divider: {
        opacity: "0.6",
        marginBottom: 20,
    },
    sideBarLink: {
        display: "flex",
        alignItems: "center",
        color: "#878787",
        padding: "0 0 12px 5px",
        fontSize: 16,
        fontWeight: 500
    },
    sideBarLinkIcon: {
        color: "#2874f0",
        marginRight: 15,
    },
    subMenu: {
        padding: "5px 0 10px 0",
    },
    subLink: {
        color: "#2C3E50",
        padding: "12px 5px 12px 45px",
        fontSize: 14,
    },
    hoverTab: {
        "&:hover": {
            fontWeight: 500,
            color: "#2874f0",
            backgroundColor: "#f5faff",
        },
    },
}));

export default function Sidebar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state) => state.userReducer);
    const { setUserInfo, setIsAuthenticate } = bindActionCreators(actionCreators, dispatch)
    const { clearCart } = bindActionCreators(cartActionCreators, dispatch)
    const currentPath = location.pathname;

    const activeStyle = {
        fontWeight: 500,
        color: "#2874f0",
        backgroundColor: "#f5faff",
    };

    const logout = () => {
        setUserInfo({});
        setIsAuthenticate(false);
        clearCart();
        window.location.replace("/")
    };
    return (
        <>
            <Box boxShadow={1} className={classes.header}>
                <Box className={classes.profileWrapper}>
                    <Avatar
                        alt="Avatar"
                        src={maleAvatarUrl}
                        className={classes.large}
                    />
                    <Box style={{ paddingLeft: 15 }}>
                        <Typography className={classes.smallText}>Hello,</Typography>
                        <Typography className={classes.boldText}>{`${user.fName} ${user.lName}`}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.bottom}>
                <Link to="/orders" style={{ textDecoration: 'none' }}>
                    <Box className={clsx(classes.sideBarLink, classes.hoverTab)}>
                        <img src={OrderIcon} width="20px" height="20px" className={classes.sideBarLinkIcon} />
                        <p style={{ paddingTop: '15px' }}>MY ORDERS</p>
                        <ChevronRight style={{ marginLeft: "auto" }} />
                    </Box>
                </Link>
                <Divider className={classes.divider} style={{ marginTop: 5 }} />
                <Box className={classes.sideBarLink}>
                    <Person className={classes.sideBarLinkIcon} />
                    <p style={{ paddingTop: '15px' }}>ACCOUNT SETTINGS</p>
                </Box>
                <Box className={classes.subMenu}>
                    <Link to="/account" style={{ textDecoration: 'none' }}>
                        <Typography
                            className={clsx(classes.subLink, classes.hoverTab)}
                            style={currentPath === "/account" ? activeStyle : {}}
                        >
                            Profile Information
                        </Typography>
                    </Link>
                    <Link to="/account/addresses" aria-disabled={true} style={{ textDecoration: 'none' }}>
                        <Typography
                            className={clsx(classes.subLink, classes.hoverTab)}
                            style={currentPath === "/account/addresses" ? activeStyle : {}}
                        >
                            Manage Addresses
                        </Typography>
                    </Link>
                </Box>
                <Divider className={classes.divider} />
                <Box
                    className={clsx(classes.sideBarLink, classes.hoverTab)}
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                >
                    <PowerSettingsNew className={classes.sideBarLinkIcon} />
                    <p style={{ paddingTop: '15px' }}>Logout</p>
                </Box>
            </Box>
        </>
    );
}
