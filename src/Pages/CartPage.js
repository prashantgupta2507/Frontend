import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom'

import LoadSpinner from '../Components/LoadSpinner'
import ToastMessageContainer from '../Components/ToastMessageContainer'
import { cartActionCreators } from '../Actions/index'
import CartItem from '../Components/cart/CartItem';
import TotalView from '../Components/cart/TotalView';
import EmptyCart from '../Components/cart/EmptyCart';

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
    backgroundColor: '#e0e0e0'
  },
  leftComponent: {
    paddingRight: 15,
    [theme.breakpoints.between(0, 960)]: {
      paddingRight: 0,
      marginBottom: 20,
    },
  },
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  bottom: {
    padding: "16px 22px",
    background: "#fff",
    boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
    borderTop: "1px solid #f0f0f0",
  },
  placeOrder: {
    display: "flex",
    marginLeft: "auto",
    background: "#fb641b",
    color: "#fff",
    borderRadius: 2,
    width: 250,
    height: 51,
  },
}));

export default function CartPage() {
  const classes = useStyle();
  const history = useHistory();

  const { cartItems } = useSelector((state) => state.cartReducer);
  const { isAuthenticate } = useSelector((state) => state.userReducer);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { getCartItems } = bindActionCreators(cartActionCreators, dispatch);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (isAuthenticate) {
      getCartItems();
    }
  }, [isAuthenticate]);


  const placeOrder = () => {
    history.replace('/checkout')
  };

  return isLoading ? (
    <LoadSpinner />
  ) : (
    <>
      {cartItems.length ? (
        <Grid container className={classes.component}>
          <Grid
            item
            lg={9}
            md={9}
            sm={12}
            xs={12}
            className={classes.leftComponent}
          >
            <Box className={classes.header}>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                My Cart ({cartItems?.length})
              </Typography>
            </Box>
            {cartItems.map((item) => (
              <CartItem data={item} key={item.product_id} />
            ))}
            <Box className={classes.bottom}>
              <Button
                onClick={placeOrder}
                variant="contained"
                className={classes.placeOrder}
                style={{ backgroundColor: "#fb641b" }}
              >
                Place Order
              </Button>
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView />
          </Grid>
        </Grid>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
      <ToastMessageContainer />
    </>
  );
}
