import React, { useEffect } from 'react';
import Logo from '../../Images/logo.png'
import AuthPage from '../../Pages/AuthPage'
import SubCategory from './SubCategory';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, Box, Typography, } from '@mui/material';
import { Link } from "react-router-dom";
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';

import { bindActionCreators } from "redux";
import { actionCreators } from '../../Actions/index'
import ProfileMenu from "./ProfileMenu";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    menu_link: {
        display: "flex",
    },
    menu_cart: {
        marginLeft: "5px",
        fontSize: "1rem",
        fontWeight: 500,
        TextDecoration: "none",
    },
}));

export default function NavbarMain() {

    const classes = useStyles();
    const location = useLocation()
    const { popupLogin, isAuthenticate, isModalOpen } = useSelector((state) => state.userReducer)
    const { cartItems } = useSelector((state) => state.cartReducer)
    const dispatch = useDispatch()
    const { setPopupLogin, modalOpen, modalClose, setIsAuthenticate } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        if (location.pathname === "/login")
            setPopupLogin(false)
        else
            setPopupLogin(true)
        if (!isAuthenticate)
            setIsAuthenticate(false);
        // eslint-disable-next-line
    }, [location.pathname, isAuthenticate])

    const handleClickOpen = () => {
        modalOpen()
    }

    const handleClose = () => {
        modalClose()
    }
    
    const fashion_name = ["Men's Top Wear", "Men's Bottom Wear", "Women Ethnic", "Women Western", "Men Footwear", "Women Western", "Watches and Accessories","Bags, Suitcases & Luggage"];
    const fashion =
    [   
        ["Men's T-Shirts", "Men's Casual Shirts", "Men's Formal Shirts", "Men's Kurtas", "Men's Blazers", "Men's Raincot", "Men's Suit"],
        ["Men's Jeans", "Men's Trousers", "Men's Trackpants", "Men's Shorts", "Men's Dhoti", "Men's Ethnic Pyjama", "Men's Cargos"],
        ["Women Sarees", "Women Kurtas & Kurtis", "Ethnic Dresses", "Women Gowns", "Women Lehenga Cholis", "Women Laggings & Patialas", "Women Dupatta"],
        ["Women Tops", "Women Dresses", "Women T-shirts & Polo T-shirts", "Women Jeans", "Women Trouser", "Women Jumpsuit"],
        ["Men's Sports Shoes", "Men's Casual Shoes", "Men's Sandals & Floaters", "Men's Slippers & Flip Flops", "Men's Formal Shoes", "Men's Ethnic Shoes"],
        ["Women Flats", "Women Heels", "Women Wedges", "Women Slipper Flip Flops", "Women Casual Shoes", "Women Sports Shoes", "Women Sneakers"],
        ["Men & Women Watches", "Men & Women Sunglasses", "Wallets", "Men & Women Belts", "Women Fashion Jewellery", "Men Fashion Jewellery"],
        ["Backpacks", "Suitcases & Trolleys", "Dufflebags", "Handbags", "Travel Accessories"]
    ]


    const electronics_name = ["Audio", "Camera & Accessories", "Laptop Accessories", "Mobile Accessories"];
    const electronics = 
    [
        ["Bluetooth Headphones", "Wired Headphones", "True Wireless Earbuds", "Bluetooth Speakers", "Soundbars", "Home Theatres", "Remote Control"],
        ["DSLR & Mirrorless", "Camera tripods", "Camera Lenses", "Drone", "Flashes"],
        ["Mouse", "Laptop Keyboards", "Router", "Data Cards", "UPS", "USB Gadgets", "Laptop Battery", "Laptop Adapter", "Wireless USB Adapter", "Processor"],
        ["Plain Cases", "Designer Cases", "Screen Guards", "Mobile Cable", "Mobile Flash", "Mobile USB Gadget", "Camera Lens Protectors"]
    ]

    const appliances_name = ["Television","Washing Machines","Air Conditioners","Refrigerators","Home Appliances"]
    const appliances = 
    [
        ["Big Screen TVs", "Smart TVs", "4K UHD TVs", "OLED TVs", "QLED TVs", "Nanocell TVs"],
        ["Fully Automatic Front Load", "Semi Automatic Top Load", "Fully Automatic Top Load", "Wash Dryers", "Washer Only"],
        ["Inverter ACs", "Split ACs", "Window ACs", "5 Star ACs", "1 Ton ACs", "1.5 Ton ACs"],
        ["Single Door", "Double Door", "Triple Door", "Side by Side", "4 Door", "Mini Refrigerators"],
        ["Irons", "Water Purifiers", "Inverters", "Vaccum Cleaners", "Sewing Machines", "Air Purifiers"]
    ]

    const others_name = ["Beauty & Personal Care","Men's Grooming","Baby Care","Sports & Fitness"]
    const others = 
    [
        ["Bath & Oral Care", "Personal Hygiene", "Eye Makeup", "Face Makeup"],
        ["Face Washes", "Beard Oils", "Hair Styling", "Shaving Essentials", "Soaps"],
        ["Baby Diapers", "Baby Wipes", "Baby Bath & Grooming", "Baby Food"],
        ["Badminton", "Cricket", "Cycling", "Football", "Fitness Equipments", "Supports"]
    ]
    return (
        <nav>
            <Link to="/"><img src={Logo} alt="logo" className='img' /></Link>
            <ul>
                <li><div className="btn-group">
                    <p className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        PRODUCTS
                    </p>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><Link className="dropdown-item" to="/">Fashion &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                
                                {fashion.map((value,index)=>{
                                    return <SubCategory category={value} name = {fashion_name[index]} />
                                })}                              
                            </ul></li>

                        <li><Link className="dropdown-item" to="/">Electronics &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                {electronics.map((value,index)=>{
                                    return <SubCategory category={value} name = {electronics_name[index]} />
                                })} 
                            </ul>
                        </li>

                        <li><Link className="dropdown-item" to="/">Appliances &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                {appliances.map((value,index)=>{
                                    return <SubCategory category={value} name = {appliances_name[index]} />
                                })} 
                            </ul>
                        </li>
                        <li><Link className="dropdown-item" to="/">Beauty, Toys & More &nbsp;&nbsp; &raquo;</Link>
                            <ul className="dropdown-menu dropdown-submenu">
                                {others.map((value,index)=>{
                                    return <SubCategory category={value} name = {others_name[index]} />
                                })} 
                            </ul>
                        </li>
                    </ul>
                </div></li>
                {window.location.pathname === '/' ? <><li><a href="#about">ABOUT</a></li>
                    <li><a href="#contact">CONTACT</a></li></> : <><li><Link to="/">ABOUT</Link></li>
                    <li><Link to="/">CONTACT</Link></li></>}
            </ul>
            {isAuthenticate ? (
                <ProfileMenu />
            ) : (
                <span onClick={() => { if (popupLogin) handleClickOpen() }}>LOGIN</span>
            )}

            <Link to="/cart">
                <Box className={classes.menu_link}>
                    <ShoppingCart />
                    {cartItems.length > 0 && (
                        <Badge badgeContent={cartItems.length} color="secondary" style={{ marginLeft: '-58px' }}></Badge>
                    )}
                    <Typography className={classes.menu_cart}>Cart</Typography>
                </Box>
            </Link>

            {/* ########## Login Dialog Box  #########*/}
            <Dialog onClose={handleClose} open={isModalOpen}>
                <DialogContent style={{ width: "100%" }}>
                    <AuthPage popup={true} />
                </DialogContent>
            </Dialog>
        </nav>
    );
}