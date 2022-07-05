import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { orderActionCreators } from '../../Actions';
import clsx from 'clsx';

const useStyle = makeStyles({
  header: {
    padding: "15px 24px",
    background: "#fff",
  },
  greyTextColor: {
    color: "#878787",
  },
  container: {
    "& > *": {
      marginBottom: 20,
      fontSize: 14,
    },
  },
  price: {
    float: "right",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 600,
    borderTop: "1px dashed #e0e0e0",
    padding: "20px 0",
    borderBottom: "1px dashed #e0e0e0",
  },
});

export default function TotalView({ page = "cart" }) {
  const classes = useStyle();
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const { cartItems, stateChangeNotifyCounter } = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch();

  const { setTotalAmount } = bindActionCreators(orderActionCreators, dispatch)

  useEffect(() => {
    totalAmount();
  }, [cartItems, stateChangeNotifyCounter]);

  const totalAmount = () => {
    let price = 0,
      discount = 0;
    cartItems.map((item) => {
      price += ((item.price * 100) / (100 - item.discount)) * item.qty
      discount += (((item.price * 100) / (100 - item.discount)) * item.qty) * (item.discount / 100);
    });

    setPrice(Math.floor(price));
    setDiscount(Math.floor(discount));
    setDeliveryCharges(Math.floor(price - discount) > 500 ? 0 : 40);

    if (page === "checkout") {
      setTotalAmount(price - discount + deliveryCharges);
    }
  };

  return (
    <Box>
      <Box
        className={classes.header}
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <Typography className={classes.greyTextColor}>PRICE DETAILS</Typography>
      </Box>
      <Box className={clsx(classes.header, classes.container)}>
        <Typography>
          Price ({cartItems?.length} item)
          <span className={classes.price}>₹{price}</span>
        </Typography>
        <Typography>
          Discount<span className={classes.price}>-₹{discount}</span>
        </Typography>
        <Typography>
          Delivery Charges
          <span className={classes.price}>
            {deliveryCharges > 0 ? "₹40" : "FREE"}{" "}
          </span>
        </Typography>
        <Typography className={classes.totalAmount}>
          {page === "checkout" ? "Total Payable" : "Total Amount"}
          <span className={classes.price}>
            ₹{price - discount + deliveryCharges}
          </span>
        </Typography>
        <Typography style={{ fontSize: 16, color: "green" }}>
          You will save ₹{discount - deliveryCharges} on this order
        </Typography>
      </Box>
    </Box>
  );
}
