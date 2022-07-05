import React from 'react'
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { ShoppingCart as Cart } from '@mui/icons-material';
import { bindActionCreators } from 'redux';
import { cartActionCreators } from '../Actions';

const useStyle = makeStyles((theme) => ({
  leftContainer: {
    minWidth: "40%",

    textAlign: "center",
    padding: "20px 40px 0 20px",
    [theme.breakpoints.down("md")]: {
      padding: "20px 40px",
    },
  },
  imageBox: {
    padding: "10px",
    border: "1px solid #f0f0f0",
    width: "100%",
    height: 350,
  },
  image: {
    objectFit: "contain",
    height: "90%",
    width: "90%",
  },
  favorite: {
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    left: "91%",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #f0f0f0",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 10%)",
    background: "#fff",
    color: "#c2c2c2",
  },
  button: {
    width: "40%",
    borderRadius: 2,
    height: 50,
  },
  addToCart: {
    background: "#ff9f00",
    color: "#FFF",
  },
  buyNow: {
    background: "#fb641b",
    color: "#FFF",
  },
  red: {
    color: "#ff4343",
  },
}));

export default function ProductImageSlider(props) {
  const { data } = props

  const classes = useStyle();
  const dispatch = useDispatch();
  const { addToCart } = bindActionCreators(cartActionCreators, dispatch)

  const addItemToCart = () => {
    addToCart(data);
  }

  return (
    <Box className={classes.leftContainer}>
      <Box className={classes.imageBox}>
        <img
          src={data.main_image_url}
          className={classes.image}
          alt="main"
        />
      </Box>
      <br />
      <Button
        onClick={() => addItemToCart()}
        className={clsx(classes.button, classes.addToCart)}
        style={{ marginRight: 10, backgroundColor: "#ff9f00" }}
        variant="contained"
      >
        <Cart />
        Add to Cart
      </Button>
    </Box>
  )
}
