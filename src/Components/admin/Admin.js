import Dashboard from './Dashboard'
import AddProducts from './AddProducts'
import AdminInventory from './Inventory/AdminInventory'
import PendingOrders from './PendingOrders'
import { maleAvatarUrl } from '../../constants/data'

import React, { useState } from 'react'
import '../../styles/Admin.css'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../Actions/index'

export default function Admin() {

    const [bool, setBool] = useState(true)
    const [action, setAction] = useState({
        openDashboard: true,
        openAddProducts: false,
        openInventory: false,
        openPendingOrders: false
    });

    const drop = () => {
        if (bool) {
            document.getElementsByClassName('icons')[0].classList.add('show');
            document.getElementsByClassName('user-img')[0].setAttribute('aria-expanded', true);
            document.getElementsByClassName('drop-down')[0].classList.add('show');
            setBool(false)
        }
        else {
            document.getElementsByClassName('icons')[0].classList.remove('show');
            document.getElementsByClassName('user-img')[0].setAttribute('aria-expanded', false);
            document.getElementsByClassName('drop-down')[0].classList.remove('show');
            setBool(true)
        }
    }

    const handleActions = (key) => {
        switch (key) {
            case 'Dashboard':
                setAction({
                    openDashboard: true,
                    openAddProducts: false,
                    openInventory: false,
                    openPendingOrders: false
                })
                document.getElementsByTagName('h5')[0].style.color = '#7571f9'
                document.getElementsByTagName('h5')[1].style.color = 'black'
                document.getElementsByTagName('h5')[2].style.color = 'black'
                document.getElementsByTagName('h5')[3].style.color = 'black'
                break;
            case 'Add Products':
                setAction({
                    openDashboard: false,
                    openAddProducts: true,
                    openInventory: false,
                    openPendingOrders: false
                })
                document.getElementsByTagName('h5')[1].style.color = '#7571f9'
                document.getElementsByTagName('h5')[0].style.color = 'black'
                document.getElementsByTagName('h5')[2].style.color = 'black'
                document.getElementsByTagName('h5')[3].style.color = 'black'
                break;
            case 'Inventory':
                setAction({
                    openDashboard: false,
                    openAddProducts: false,
                    openInventory: true,
                    openPendingOrders: false
                })
                document.getElementsByTagName('h5')[2].style.color = '#7571f9'
                document.getElementsByTagName('h5')[1].style.color = 'black'
                document.getElementsByTagName('h5')[0].style.color = 'black'
                document.getElementsByTagName('h5')[3].style.color = 'black'
                break;
            case 'Pending Orders':
                setAction({
                    openDashboard: false,
                    openAddProducts: false,
                    openInventory: false,
                    openPendingOrders: true
                })
                document.getElementsByTagName('h5')[3].style.color = '#7571f9'
                document.getElementsByTagName('h5')[0].style.color = 'black'
                document.getElementsByTagName('h5')[1].style.color = 'black'
                document.getElementsByTagName('h5')[2].style.color = 'black'
                break;
            default:
                break;
        }
    };

    const dispatch = useDispatch()
    const { setIsAuthenticate, setEmail, setAuthtoken, setUserInfo } = bindActionCreators(actionCreators, dispatch)

    const logoutUser = () => {
        setIsAuthenticate(false)
        setEmail("")
        setUserInfo({})
        setAuthtoken(null)
        window.location.replace("/")
    }

    return (
        <>
            <div id='main-wrapper' className='show'>
                <div className='nav-header'>
                    <div className='brand-logo'>
                        <h4>BestOf Shopping</h4>
                    </div>
                </div>

                <div className='header'>
                    <div className='header-content clearfix'>
                        <div className='header-right'>
                            <ul className='clearfix'>
                                <li className='icons dropdown'>
                                    <div className='user-img c-pointer position-relative' data-toggle='dropdown' aria-expanded={false} onClick={drop}>
                                        <span className='activity active'></span>
                                        <img src={maleAvatarUrl} width={40} height={40} alt="profile_img"></img>
                                    </div>
                                    <div className='drop-down dropdown-profile animated fadeIn dropdown-menu' x-placement='bottom-start' style={{ position: 'absolute', willChange: 'transform', top: 0, left: 0, transform: 'translate3d(-133px, 57px, 0px)' }}>
                                        <div className='dropdown-content-body'>
                                            <ul onClick={logoutUser}>
                                                <li>Logout</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='nk-sidebar mt-4'>
                    <div className='nk-sidebar-child' onClick={() => handleActions('Dashboard')}>
                        <h5 style={{ color: '#7571f9' }}>Dashboard</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </div>
                    <div className='nk-sidebar-child' onClick={() => handleActions('Add Products')}>
                        <h5>Add Products</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </div>
                    <div className='nk-sidebar-child' onClick={() => handleActions('Inventory')}>
                        <h5>Inventory</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </div>
                    <div className='nk-sidebar-child' onClick={() => handleActions('Pending Orders')}>
                        <h5>Pending Orders</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </div>
                </div>
                <div className='main-div mt-3' style={{ marginLeft: '15.1875rem', backgroundColor: 'lightgray', minHeight: '83vh' }}>
                    {action.openDashboard && <Dashboard />}
                    {action.openAddProducts && <AddProducts />}
                    {action.openInventory && <AdminInventory />}
                    {action.openPendingOrders && <PendingOrders />}
                </div>
            </div>

        </>
    )
}
