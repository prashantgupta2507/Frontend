import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../../styles/PendingOrders.css'

export default function PendingOrders() {

  const { authtoken } = useSelector((state) => state.userReducer);
  const [data, setData] = useState([])
  const [ref, setRef] = useState(true)

  useEffect(() => {
    let mounted = true
    axios.post('http://localhost:5500/api/admin/pendingOrders', { authtoken })
      .then(result => {
        if (mounted)
          setData(result.data.pending)
      })
    return () => mounted = false
  }, [ref])

  const confirmOrder = (order_id) => {
    axios.patch('http://localhost:5500/api/admin/confirmOrder', { authtoken, order_id })
      .then(() => setRef(!ref))
  }

  const cancelOrder = (order_id) => {
    axios.post('http://localhost:5500/api/admin/cancelOrder', { authtoken, order_id })
      .then(() => setRef(!ref))
  }

  return (
    <>
      <div className='container-fluid py-3'>
        <div style={{ backgroundColor: 'white' }}>
          <h2 className='text-center py-3'>Pending Orders</h2>
          {data.map((value, index) => {
            return ([
              <div className='mt-2' key={index} style={{ border: '1px solid black' }}>
                <div className='container-fluid my-div'>
                  <div className='text-center'>
                    <h4>Order No.</h4>
                    <h5 style={{ color: '#6a8eff' }}>{value['Order Number']}</h5>
                  </div>
                  <div className='text-center'>
                    <h4>Product Name &nbsp;</h4>
                    <h5 style={{ color: '#6a8eff' }}>{value['Products Name']}</h5>
                  </div>
                  <div className='text-center'>
                    <h4>Quantity &nbsp;</h4>
                    <h5 style={{ color: '#6a8eff' }}>{value['Products Quantity']}</h5>
                  </div>
                  <div className='text-center'>
                    <h4>Sale Price &nbsp;&nbsp;</h4>
                    <h5 style={{ color: '#6a8eff' }}>{value['Products Price']}</h5>
                  </div>
                </div>
                <div className='container-fluid text-center py-2'>
                  <button className='btn btn-success mx-2' type='button' onClick={() => confirmOrder(value['Order Number'])}>Confirm Order</button>
                  <button className='btn btn-danger' type='button' onClick={() => cancelOrder(value['Order Number'])}>Cancel Order</button>
                </div>
              </div>
            ])
          })}
        </div>
      </div>
    </>
  )
}
