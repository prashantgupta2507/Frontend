import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

import ToastMessageContainer from '../Components/ToastMessageContainer'
import ProductDetail from './ProductDetail';
import ProductImageSlider from './ProductImageSlider';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    component: {
        marginTop: 55,
        background: "#F2F2F2",
        padding: "10px 3%",
    },
    container: {
        background: "#FFFFFF",
        display: "flex",
        [theme.breakpoints.down("md")]: {
            margin: 0,
            padding: "0 7px",
        },
    },
    rightContainer: {
        marginTop: 15,
        "& > *": {
            marginTop: 10,
        },
    },
    price: {
        fontSize: 28,
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: "#878787",
        fontSize: 16,
        marginLeft: 5,
    },
    rate: {
        display: "flex",
        alignItems: "center",
        color: "#fff",
        padding: "2px 5px",
        borderRadius: 5,
        fontWeight: 600,
        fontSize: 12,
        backgroundColor: "#388e3c",
    },
}));

export default function DataItem() {
    const location = useLocation()

    useEffect(() => {
        if (location.state === undefined || location.state === null)
            history.replace("/")
    })

    const classes = useStyles();
    const [data, setData] = useState(location.state ? location.state.data : null)
    const history = useHistory()



    var rate = (Math.random() * 5).toFixed(1);
    var reviewCount = Math.round(Math.random() * 10000 + 1);
    if (rate < 4) {
        rate = 4.1;
    }
    window.scrollTo(0, 0);

    return (
        <Box className={classes.component}>
            {data && Object.keys(data).length && (
                <Grid container className={classes.container}>
                    <Grid item lg={5} md={5} sm={9} xs={12}>
                        <ProductImageSlider data={data} />
                    </Grid>
                    <Grid
                        item
                        lg={7}
                        md={7}
                        sm={7}
                        xs={12}
                        className={classes.rightContainer}
                    >
                        <Typography className='mt-4'>{data.title}</Typography>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <Typography className={classes.rate}>
                                {rate} <Star style={{ fontSize: 12, marginLeft: 3 }} />
                            </Typography>
                            <Typography className={classes.greyTextColor}>
                                &nbsp;({reviewCount})
                            </Typography>
                        </Box>
                        <Typography>
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
                        <ProductDetail data={data} />
                    </Grid>
                </Grid>
            )}
            <ToastMessageContainer />
        </Box>
    )
}
