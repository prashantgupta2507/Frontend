import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cartActionCreators } from '../Actions/index';
import toastMessage from '../utils/toastMessage';

const useStyles = makeStyles(() => ({
    cancelBtn: {
        fontWeight: 500,
        padding: "7px 5px",
        minWidth: 100,
        borderRadius: "2px",
        boxShadow: "none",
        backgroundColor: "white",
        border: "1px solid #c2c2c2",
        textTransform: "uppercase",
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            color: "#2874f0",
        },
    },
}));

export default function AlertDialogBox({ itemId, isOpenDialog = false, handleClose, type }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { removeFromCart } = bindActionCreators(cartActionCreators, dispatch)

    const removeItem = () => {
        switch (type) {
            case "cart":
                removeFromCart(itemId);
                break;
            default:
                break;
        }
        toastMessage("Item Removed", "success");
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={isOpenDialog}
                maxWidth={"md"}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Remove Item"}</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        style={{ marginLeft: "8%" }}
                        id="alert-dialog-slide-description"
                    >
                        Are you sure you want to remove this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "15px 0",
                    }}
                >
                    <button
                        onClick={handleClose}
                        className={classes.cancelBtn}
                    >
                        Cancel
                    </button>
                    <Button
                        onClick={removeItem}
                        style={{ background: "#2874f0" }}
                        variant="contained"
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
