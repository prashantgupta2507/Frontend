import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Success from '../Images/success.png'

export default function OrderSuccessPage() {
  const history = useHistory();
  const { isAuthenticate } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!isAuthenticate)
      history.replace("/")
    setTimeout(() => {
      history.replace("/orders");
    }, 30000);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "14px",
        padding: "20px",
        marginTop: "70px",
      }}
    >
      <div>
        <img
          style={{ width: "400px", maxWidth: "100%" }}
          src={Success}
          alt="main"
        />
        <div
          style={{
            fontSize: "2em",
            marginTop: "-30px",
            marginBottom: "30px",
            fontWeight: 500,
          }}
        >
          Order Completed !
        </div>
        <Button
          style={{ backgroundColor: "#2874f0" }}
          variant="contained"
        >
          <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</Link>
        </Button>
      </div>
    </div>
  );
}
