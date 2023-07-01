import React, { useEffect, useState } from 'react'
import { ShoppingCart } from '@mui/icons-material';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cartActionCreators } from '../Actions';

export default function Products(props) {
    const { category_name } = useParams()
    const [data, setData] = useState([])
    const history = useHistory()
    const dispatch = useDispatch();
    const { addToCart } = bindActionCreators(cartActionCreators, dispatch)

    useEffect(() => {
        props.setPath("/abc")
        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        console.log("chayan" + category_name)
        axios.get(`http://localhost:5500/api/user/product/${category_name}`)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    setData(res.data)
                }
            })
    }, [category_name])

    const handleClick = (value) => {
        value.qty = 1;
        history.push(`/product/${value.title}`, {
            data: value
        })
    }

    const AddToCart = (value) => {
        value.qty = 1;
        addToCart(value)
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <h4>Best of Appliances</h4>
                <p>{data.length} Items</p>
            </div>
            <hr />
            <div className='container-fluid' style={{ backgroundColor: '#e4e7ed' }}>
                <div className="row">
                    {data.length > 0 ? data.map((value, index) => {
                        return (<div className="col-sm-4 mt-2" key={index}>
                            <div className="card" >
                                <img src={value.main_image_url} className="card-img-top" alt="..." style={{ height: '50vh' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{value.title}</h5>
                                    <p className="card-text">&#8377;{value.price}  &nbsp;&nbsp;&nbsp;<s>&#8377;{Math.floor(((value.price) * 100) / (100 - value.discount))}</s> &nbsp;&nbsp;&nbsp;{Math.floor(value.discount)}% off</p>
                                </div>
                                <div className="card-footer">
                                    <button className='btn btn-primary' onClick={() => AddToCart(value)}><ShoppingCart /> ADD TO CART</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button className='btn btn-warning' onClick={() => handleClick(value)}><ShoppingBag /> EXPLORE... </button>
                                </div>
                            </div>
                        </div>)
                    }) : null}
                </div>
            </div>
        </>
    )
}
