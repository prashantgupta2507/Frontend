import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyle = makeStyles((theme) => ({
  itemRow: {
    padding: "25px 35px",
    margin: "16px 0",
    background: "#fff",
    boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
    borderTop: "1px solid #f0f0f0",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      padding: "25px 30px",
    },
  },
  image: {
    width: "60%",
    maxHeight: 150,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      margin: "15px 0",
      width: "100%",
    },
  },
  price: {
    fontSize: 20,
    fontWeight: 600,
  },
  text: {
    fontSize: 14,
    color: "#212121",
    marginBottom: 5,
    marginTop: 5,
  },
  centerItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  itemTitle: {
    color: "#212121",
    fontSize: 14,
    "&:hover": {
      cursor: "pointer",
      color: "#2874f0",
    },
  },
  paymentDetails: {
    paddingLeft: "2%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingLeft: 0,
    },
  }
}));

export default function OrderRow({ order }) {
  const classes = useStyle();

  return (
    <>
      {order.map((item, index) => (
        <Box className={classes.itemRow} key={index}>
          <Grid container>
            <Grid item lg={3.5} md={2} sm={3} xs={12}>
              <Box>
                <img
                  src={item['product_img']}
                  className={classes.image}
                  alt='main'
                />
              </Box>
            </Grid>
            <Grid item lg={1.5} md={3} sm={3} xs={8}>
              <Typography className={classes.itemTitle} >
                {item['product_name']}
              </Typography>
            </Grid>
            <Grid item lg={2} md={2} sm={3} xs={4} className={classes.centerItems}>
              {/* Price */}
              <span className={classes.price}>₹{item['price']}</span>
            </Grid>
            <Grid item lg={2} md={2} sm={3} xs={12} className={classes.paymentDetails}>
              {/* Payment Mode */}
              <Typography className={classes.text}>
                {new Date().toLocaleDateString()}
              </Typography>
              <Typography className={classes.text}>
                {item.paymentMode === "online" ? "Online" : "Cash on Delivery"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              {/* Address */}
              <Box>
                <Typography className={classes.text}>
                  {item.name}
                  <span style={{ marginLeft: 10 }}>{7879724803}</span>
                </Typography>
                <Typography className={classes.text}>
                  Saket Dham, Indore,{" "}
                  Madhya Pradesh -
                  <span> 452001</span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}
