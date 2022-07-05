import React from 'react'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Badge } from '@mui/material';
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import clsx from 'clsx';

const useStyle = makeStyles({
  rightContainer: {
    msOverflowY: "scroll",
  },

  smallText: {
    fontSize: 14,
    verticalAlign: "baseline",
    "& > *": {
      fontSize: 14,
      marginTop: 10,
    },
  },
  greyTextColor: {
    color: "#878787",
    border: "none",
  },
  badge: {
    marginRight: 10,
    color: "#239B56",
    fontSize: 15,
  },
  wrapper: {
    display: "flex",
  },
  borderNone: {
    border: "none",
  },
});

export default function ProductDetail(props) {
  const { data } = props;
  const classes = useStyle();
  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

  return (
    <Box className={classes.rightContainer}>
      <Typography>Available offers</Typography>
      <Box className={classes.smallText}>
        <Typography>
          <span>
            <svg style={{ width: '23px', height: '23px' }} fill="#239B56"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></svg>
          </span>
          <Badge className={classes.badge} />
          Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
        </Typography>
        <Typography>
          <span>
            <svg style={{ width: '23px', height: '23px' }} fill="#239B56"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></svg>
          </span>
          <Badge className={classes.badge} />
          Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time
          transaction, Terms and Condition apply
        </Typography>
        <Typography>
          <span>
            <svg style={{ width: '23px', height: '23px' }} fill="#239B56"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></svg>
          </span>
          <Badge className={classes.badge} />
          Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select
          ACs
        </Typography>
        <Typography>
          <span>
            <svg style={{ width: '23px', height: '23px' }} fill="#239B56"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path></svg>
          </span>
          <Badge className={classes.badge} />
          Partner OfferExtra 10% off upto ₹500 on next furniture purchase
        </Typography>
      </Box>
      <Table>
        <TableBody>
          <TableRow className={classes.smallText}>
            <TableCell className={classes.greyTextColor}>Delivery</TableCell>
            <TableCell
              className={classes.borderNone}
              style={{ fontWeight: 600 }}
            >
              Delivery by {date.toDateString()} |{" "}
              {Number(data.price) > 500 ? "Free" : "₹40"}
            </TableCell>
          </TableRow>
          <TableRow className={classes.smallText}>
            <TableCell className={classes.greyTextColor}>Warranty</TableCell>
            <TableCell className={classes.borderNone}>No Warranty</TableCell>
          </TableRow>
          <TableRow className={classes.smallText}>
            <TableCell className={classes.greyTextColor}>Description</TableCell>
            <TableCell className={clsx(classes.smallText, classes.borderNone)}>
              <Typography>{data.summary}</Typography>
            </TableCell>
          </TableRow>
          {data.size !== null && data.size !== 'null' ? <TableRow className={classes.smallText}>
            <TableCell className={classes.greyTextColor}>Size</TableCell>
            <TableCell className={clsx(classes.smallText, classes.borderNone)}>
              <Typography>{data.size}</Typography>
            </TableCell>
          </TableRow> : null}
        </TableBody>
      </Table>
    </Box>
  );
}
