import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    center: {
        marginTop: "50vh",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

export default function LoadSpinner() {
    const classes = useStyles();
    return (
        <Box className={classes.center}>
            <CircularProgress style={{ color: "#2874f0" }} />
        </Box>
    );
}
