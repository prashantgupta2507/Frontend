import React, { useState } from 'react'
import '../../../styles/Inventory.css'
import Orders from './Orders'
import Products from './Products'
import Users from './Users'

export default function AdminInventory() {

  const [action, setAction] = useState({
    openProducts: true,
    openOrders: false,
    openUsers: false,
    openUpdateProduct: false,
    openDeleteProduct: false
  });

  const handleChange = (e) => {
    if (e === 'product')
      setAction({ openProducts: true, openOrders: false, openUsers: false })
    else if (e === 'orders')
      setAction({ openProducts: false, openOrders: true, openUsers: false })
    else
      setAction({ openProducts: false, openOrders: false, openUsers: true })
  }

  return (
    <div className='container-fluid py-3'>
      <div className='row px-5'>
        <div className='col-lg col-sm'>
          <div className='card gradient-1 inventory-div' onClick={() => handleChange('product')}>
            <div className='card-body'>
              <h1 className='text-center'>Products</h1>
            </div>
          </div>
        </div>

        <div className='col-lg col-sm'>
          <div className='card gradient-2 inventory-div' onClick={() => handleChange('orders')}>
            <div className='card-body'>
              <h1 className='text-center'>Orders</h1>
            </div>
          </div>
        </div>

        <div className='col-lg col-sm'>
          <div className='card gradient-3 inventory-div' onClick={() => handleChange('users')}>
            <div className='card-body'>
              <h1 className='text-center'>Users</h1>
            </div>
          </div>
        </div>
      </div>

      {action.openProducts && <Products />}
      {action.openOrders && <Orders />}
      {action.openUsers && <Users />}
    </div>
  )
}