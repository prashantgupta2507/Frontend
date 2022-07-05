import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import '../../styles/Dashboard.css'

export default function Dashboard() {

  const { authtoken, isAuthenticate } = useSelector((state) => state.userReducer);
  const history = useHistory()

  const [data, setData] = useState({
    users: 0,
    productSold: 0,
    totalEarnings: 0
  })

  useEffect(() => {
    if (!isAuthenticate)
      history.replace('/')
    let mounted = true
    axios.post('http://localhost:5500/api/admin/dashboard', { authtoken })
      .then(res => {
        if (mounted)
          setData({ ...data, productSold: res.data.productSold, users: res.data.users, totalEarnings: res.data.totalEarnings })
      })
    return () => mounted = false
  }, [data])

  return (
    <div className='container-fluid py-3'>
      <div className='row'>
        <div className='col-lg-3 col-sm-6'>
          <div className='card gradient-1'>
            <div className='card-body'>
              <h3 className='card-title text-white'>Products Sold</h3>
              <div className='d-inline-block'>
                <h2 className='text-white'>{data.productSold ? data.productSold : 0} &nbsp;&nbsp;</h2>
              </div>
              <span className='float-right display-5 opacity-5'>
                <i className='fa fa-shopping-cart'></i>
              </span>
            </div>
          </div>
        </div>

        <div className='col-lg-3 col-sm-6'>
          <div className='card gradient-2'>
            <div className='card-body'>
              <h3 className='card-title text-white'>Total Earnings</h3>
              <div className='d-inline-block'>
                <h2 className='text-white'>&#8377;{data.totalEarnings ? data.totalEarnings : 0} &nbsp;</h2>
              </div>
              <span className='float-right display-5 opacity-5'>
                <i className='fa fa-money'></i>
              </span>
            </div>
          </div>
        </div>

        <div className='col-lg-3 col-sm-6'>
          <div className='card gradient-3'>
            <div className='card-body'>
              <h3 className='card-title text-white'>Total Customers</h3>
              <div className='d-inline-block'>
                <h2 className='text-white'>{data.users ? data.users : 0} &nbsp;</h2>
              </div>
              <span className='float-right display-5 opacity-5'>
                <i className='fa fa-users'></i>
              </span>
            </div>
          </div>
        </div>

        <div className='col-lg-3 col-sm-6'>
          <div className='card gradient-4'>
            <div className='card-body'>
              <h3 className='card-title text-white'>Feedbacks</h3>
              <div className='d-inline-block'>
                <h2 className='text-white'>4 &nbsp;</h2>
              </div>
              <span className='float-right display-5 opacity-5'>
                <i className='fa fa-heart'></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='container reviews' style={{ backgroundColor: 'white' }}>
        <div className='container mt-3'>
          <h2 style={{ color: '#843cf6' }}>Reviews</h2>
          <span><i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i></span>
          <meter id="five_star" value="0.6">60%</meter>
          <span><i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i></span>
          <meter id="four_star" value="0.4">40%</meter>
          <span><i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#843cf6' }}></i></span>
          <meter id="three_star" value="0.3">30%</meter>
          <span><i className="fa fa-solid fa-star" style={{ color: '#fc5286' }}></i>
            <i className="fa fa-solid fa-star" style={{ color: '#fc5286' }}></i></span>
          <meter id="two_star" value="0.4">40%</meter>
          <span><i className="fa fa-solid fa-star" style={{ color: '#fc5286' }}></i></span>
          <meter id="one_star" value="0.1">10%</meter>
        </div>
      </div>
    </div>
  )
}
