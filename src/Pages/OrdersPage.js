import { Box, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { orderActionCreators } from '../Actions';
import LoadSpinner from '../Components/LoadSpinner'
import { noOrdersUrl } from "../constants/data";
import OrderRow from './OrderRow';

const useStyle = makeStyles((theme) => ({
    component: {
        marginTop: 55,
        padding: "30px 135px",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            padding: "15px 0",
        },
        [theme.breakpoints.down("md")]: {
            marginBottom: 20,
        },
    },
    leftComponent: {
        paddingRight: 15,
        [theme.breakpoints.down("sm")]: {
            marginBottom: 15,
        },
    },
    header: {
        padding: "15px 24px",
        margin: "10px 0px",
        background: "#fff",
    },
    itemRow: {
        padding: "16px 22px",
        background: "#fff",
        boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
        borderTop: "1px solid #f0f0f0",
        [theme.breakpoints.down("md")]: {
            padding: "15px 0px"
        },
    },
    emptyComponent: {
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
    },
    btn: {
        display: "block",
        margin: "0 auto",
        marginTop: 15,
        fontSize: 16,
        padding: "5px 30px",
    },
    image: {
        width: "20%",
        minWidth: 200,
        objectFit: "contain"
    },
}));

export default function OrdersPage(props) {

    const classes = useStyle();
    const { isAuthenticate, user } = useSelector((state) => state.userReducer);
    const [isLoading, setIsLoading] = useState(true);
    const { orderDetails } = useSelector((state) => state.orderReducer);
    const dispatch = useDispatch();
    const { getOrderDetails } = bindActionCreators(orderActionCreators, dispatch)
    const history = useHistory();

    useEffect(()=>{
        props.setPath("/abc")
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if (!isAuthenticate) {
            history.replace("/login?ref=orders");
        }
        getOrderDetails();
        setTimeout(() => {
            setIsLoading(false);
        }, 700);
        // eslint-disable-next-line
    }, [isAuthenticate]);

    return isLoading ? (
        <LoadSpinner />
    ) : (
        <>
            {user.orders.length > 0 ? (
                <Grid container className={classes.component}>
                    {/* <Grid item lg={1} md={1} sm={12} xs={12}>
            </Grid> */}
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.leftComponent}
                    >
                        <Box className={classes.header}>
                            <Typography style={{ fontWeight: 600, fontSize: 22 }}>
                                My Orders
                            </Typography>
                        </Box>
                        {/* {orderDetails?.map((order,index) => (
                            <OrderRow order={order} key={index}/>
                        ))} */}
                        <OrderRow order={user.orders[0].result} />
                    </Grid>
                </Grid>
            ) : (
                <Box className={classes.emptyComponent}>
                    <img src={noOrdersUrl} className={classes.image} alt='orders'/>
                    <Typography style={{ fontSize: 22, fontWeight: 600 }}>
                        You have no orders
                    </Typography>
                    <Button
                        variant="contained"
                        className={classes.btn}
                        onClick={() => history.replace("/")}
                        style={{ background: "#2874f0", textTransform: "capitalize" }}
                    >
                        {" "}
                        Start Shopping
                    </Button>
                </Box>
            )}
        </>
    );
}
