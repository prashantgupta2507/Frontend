import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ExpandMore } from "@mui/icons-material";
import { PowerSettingsNew } from "@mui/icons-material";
import { AccountCircleRounded } from "@mui/icons-material";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles({
  menuLink: {
    display: "flex",
    cursor: "pointer",
    marginLeft: '4vw',
    color: 'rgb(216, 112, 147)'
  },
  menuItem: {
    padding: "12px 25px"
  },
  menuIcon: {
    marginRight: 10,
    color: "#2874f0",
  }
});

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.userReducer);
  const history = useHistory()
  const classes = useStyles();
  const dispatch = useDispatch()
  const { setIsAuthenticate, setEmail, setUserInfo, setAuthtoken } = bindActionCreators(actionCreators, dispatch)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    switch (e.target.id) {
      case "account":
        history.push("/account");
        break;
      case "logout":
        setIsAuthenticate(false)
        setAuthtoken(null)
        setEmail("")
        setUserInfo({})
        window.location.replace("/")
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <div
      id="menu"
      onMouseEnter={handleClick}
      onMouseLeave={handleClose}
      onWheel={handleClose}
      style={{ height: '5vh' }}
    >
      <Box className={classes.menuLink}>
        <Typography style={{ extTransform: "capitalize" }}>
          {user.fName}
        </Typography>
        <ExpandMore />
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.container}
      >
        <MenuItem
          id="account"
          className={classes.menuItem}
          onClick={handleClose}
        >
          <AccountCircleRounded className={classes.menuIcon} />
          My Profile
        </MenuItem>
        <MenuItem
          id="logout"
          className={classes.menuItem}
          onClick={(e) => {
            handleClose(e);
          }}
        >
          <PowerSettingsNew className={classes.menuIcon} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu;