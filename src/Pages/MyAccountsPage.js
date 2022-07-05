import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from '@mui/styles'
import { useSelector } from "react-redux";

import LoadSpinner from "../Components/LoadSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Sidebar from "../Components/account/Sidebar";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import PersonalInfo from "../Components/account/PersonalInfo";
import ManageAddresses from "../Components/address/ManageAddresses";

const useStyles = makeStyles((theme) => ({
    component: {
        marginTop: 55,
        padding: "30px 6%",
        display: "flex",
    },
    leftComponent: {
        paddingRight: 15,
        [theme.breakpoints.between(0, 960)]: {
            paddingRight: 0,
            marginBottom: 20,
        },
    },
}));

export default function MyAccountsPage() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    const { isAuthenticate } = useSelector((state) => state.userReducer);
    useEffect(() => {
        if (!isAuthenticate) {
            history.push('/')
        }
        setIsLoading(false);
    }, [isAuthenticate]);

    return isLoading ? (
        <LoadSpinner />
    ) : (
        <div style={{ backgroundColor: '#f0f0f0' }}>
            <Grid container className={classes.component}>
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={12}
                    xs={12}
                    className={classes.leftComponent}
                >
                    <Sidebar />
                </Grid>
                <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
                    <Switch>
                        <Route exact path="/account">
                            <PersonalInfo />
                        </Route>
                        <Route exact path="/account/addresses">
                            <ManageAddresses />
                        </Route>
                        <Route>
                            <PersonalInfo />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </div>
    )
}
