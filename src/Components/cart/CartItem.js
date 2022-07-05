import { Box, Button, Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import GroupButton from './GroupButton';
import { makeShortText } from '../../utils/makeShortText'
import AlertDialogBox from '../AlertDialogBox';

const useStyle = makeStyles({
  component: {
    borderTop: "1px solid #f0f0f0",
    borderRadius: 0,
    display: "flex"
  },
  leftComponent: {
    margin: 20,
    display: "flex",
    flexDirection: "column",
  },
  itemTitle: {
    color: "#000",
  },
  image: {
    height: 110,
    width: 110,
    objectFit: "contain",
  },
  mid: {
    margin: 20,
  },
  greyTextColor: {
    color: "#878787",
  },
  smallText: {
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: 600,
  },
  remove: {
    marginTop: 12,
    fontSize: 16
  },
});


export default function CartItem({ data }) {
  const classes = useStyle();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const dialogClose = () => {
    setIsOpenDialog(false);
  };

  const dialogOpen = () => {
    setIsOpenDialog(true);
  };

  return (
    <>
      <Card className={classes.component}>
        <Box className={classes.leftComponent}>
          <img src={data.main_image_url} className={classes.image} alt="main" />
          <GroupButton data={data} />
        </Box>
        <Box className={classes.mid}>
          <Typography className={classes.itemTitle}>
            {data.title && makeShortText(data.title)}
          </Typography>

          <Typography style={{ margin: "20px 0", color: "#000" }}>
            <span className={classes.price}>₹{data.price}</span>
            &nbsp;&nbsp;&nbsp;
            <span className={classes.greyTextColor}>
              <strike>₹{Math.floor((data.price * 100) / (100 - data.discount))}</strike>
            </span>
            &nbsp;&nbsp;&nbsp;
            <span style={{ color: "#388E3C" }}>
              {Math.floor(data.discount)}% off
            </span>
          </Typography>
          <Button className={classes.remove} onClick={dialogOpen} style={{ background: "#fb641b", color: 'white' }}>
            Remove
          </Button>
        </Box>
      </Card>
      <AlertDialogBox
        isOpenDialog={isOpenDialog}
        handleClose={dialogClose}
        itemId={data.product_id}
        type="cart"
      />
    </>
  );
}
