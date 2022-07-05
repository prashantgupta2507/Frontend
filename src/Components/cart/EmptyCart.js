import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emptyCartUrl } from '../../constants/data'

const useStyle = makeStyles((theme) => ({
  component: {
    width: "80%",
    minWidth: 500,
    height: "65vh",
    background: "#fff",
    margin: "80px 140px",
    [theme.breakpoints.down("md")]: {
      margin: "80px 0px",
    },
  },
  image: {
    width: "20%",
    minWidth: 150,
  },
  container: {
    textAlign: "center",
    paddingTop: 70,
  },
  btn: {
    display: "block",
    margin: "0 auto",
    marginTop: 15,
    padding: "5px 60px",
    width: "12vw"
  },
}));

export default function EmptyCart() {
  const classes = useStyle();
  const history = useHistory();
  const { isAuthenticate } = useSelector((state) => state.userReducer);

  return (
    <Box className={classes.component} style={{ backgroundColor: '#f1f3f6' }}>
      <Box className={classes.container}>
        <img src={emptyCartUrl} className={classes.image} alt="main" />
        {isAuthenticate ? (
          <>
            <Typography className='my-2'>Your cart is empty!</Typography>
            <p>Add items to it now.</p>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={() => history.replace('/')}
              style={{ background: "#2874f0", textTransform: "capitalize" }}
            >
              {" "}
              Shop Now
            </Button>
          </>
        ) : (
          <>
            <Typography className='my-2'>Missing Cart items?</Typography>
            <p>Login to see the items you added previously</p>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={() => window.location.replace("/")}
              style={{ background: "#fb641b", textTransform: "capitalize" }}
            >
              Login
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
