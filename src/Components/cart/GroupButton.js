import { Button, ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cartActionCreators } from '../../Actions/index';
import toastMessage from '../../utils/toastMessage'

const useStyle = makeStyles({
    component: {
        marginTop: 30,
    },
    button: {
        borderRadius: "50%",
    },
});

export default function GroupButton({ data }) {

    const classes = useStyle();
    const [counter, setCounter] = useState(1);

    const dispatch = useDispatch();
    const { updateQty } = bindActionCreators(cartActionCreators, dispatch);

    const handleIncrement = () => {
        if (counter + 1 <= data.quantity) {
            setCounter((counter) => counter + 1);
            updateQty(data.product_id, counter + 1);
            toastMessage(`You've changed ${data.title} QUANTITY to ${counter + 1}`, "success");
        } else {
            toastMessage(`We're sorry! Only ${data.quantity} unit(s) allowed in each order`, "error");
        }
    };
    const handleDecrement = () => {
        setCounter((counter) => counter - 1);
        updateQty(data.product_id, counter - 1);
        toastMessage(`You've changed ${data.title} QUANTITY to ${counter - 1}`, "success");
    };

    return (
        <>
            <ButtonGroup className={classes.component}>
                <Button
                    className={classes.button}
                    onClick={() => handleDecrement()}
                    disabled={counter === 1}
                >
                    -
                </Button>
                <Button disabled>{counter}</Button>
                <Button className={classes.button} onClick={() => handleIncrement()}>
                    +
                </Button>
            </ButtonGroup>
        </>
    )
}
