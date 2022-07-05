import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import TryAgain from '../Images/try_again.png'

export default function OrderFailedPage() {

    const history = useHistory();
    const { isAuthenticate } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (!isAuthenticate)
            history.replace("/")
        setTimeout(() => {
            history.replace("/");
        }, 30000);
    }, []);

    return (
        <div
            style={{
                textAlign: "center",
                fontSize: "14px",
                padding: "20px",
                marginTop: "100px",
                fontWeight: 500,
                marginBottom: "6%",
            }}
        >
            <div>
                <img
                    style={{ width: "350px", maxWidth: "90%", height: "50vh" }}
                    src={TryAgain}
                    alt=""
                />
                <div
                    style={{
                        fontSize: "1.3em",
                        marginBottom: "35px",
                    }}
                >
                    Unfortunately the order was failed ! Please try again later
                </div>
                <Button
                    style={{ backgroundColor: "#2874f0" }}
                    variant="contained"
                >
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>GO TO HOMEPAGE</Link>
                </Button>
            </div>
        </div>
    );
}
